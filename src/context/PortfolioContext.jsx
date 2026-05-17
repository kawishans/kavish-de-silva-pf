import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { ref, onValue, push, set, remove, update } from 'firebase/database';
import { rtdb } from '../utils/firebase';

const STORAGE_KEY = 'kds-portfolio-projects-rtdb';
const TOOLS_STORAGE_KEY = 'kds-portfolio-tools-rtdb';

export const defaultSocialLinks = [
  { id: '1', platform: 'GitHub', url: 'https://github.com', icon: 'github', sortOrder: 0 },
  { id: '2', platform: 'LinkedIn', url: 'https://linkedin.com', icon: 'linkedin', sortOrder: 1 },
  { id: '3', platform: 'SoundCloud', url: 'https://soundcloud.com', icon: 'soundcloud', sortOrder: 2 },
  { id: '4', platform: 'Instagram', url: 'https://instagram.com', icon: 'instagram', sortOrder: 3 },
];

const PortfolioContext = createContext(null);

export function PortfolioProvider({ children }) {
  const [musicProjects, setMusicProjects] = useState([]);
  const [designProjects, setDesignProjects] = useState([]);
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);

  const [contactDetails, setContactDetails] = useState({
    email: 'hello@kavishdesilva.com',
    phonePrimary: '+94 77 123 4567',
    phoneBusiness: '+94 11 234 5678',
    location: 'Colombo, Sri Lanka'
  });
  const [socialLinks, setSocialLinks] = useState([]);

  // Listen to Realtime Database updates for music, design, tools, contact_details, and social_links
  useEffect(() => {
    const musicRef = ref(rtdb, 'music_projects');
    const designRef = ref(rtdb, 'design_projects');
    const toolsRef = ref(rtdb, 'tools');
    const contactRef = ref(rtdb, 'contact_details');
    const socialRef = ref(rtdb, 'social_links');

    let musicLoaded = false;
    let designLoaded = false;
    let toolsLoaded = false;
    let contactLoaded = false;
    let socialLoaded = false;

    const checkLoaded = () => {
      if (musicLoaded && designLoaded && toolsLoaded && contactLoaded && socialLoaded) {
        setLoading(false);
      }
    };

    const unsubMusic = onValue(musicRef, (snapshot) => {
      const data = snapshot.val();
      const list = [];
      if (data) {
        Object.entries(data).forEach(([key, val]) => {
          list.push({
            id: key,
            type: 'music',
            ...val,
          });
        });
      }
      list.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      setMusicProjects(list);
      musicLoaded = true;
      checkLoaded();
    }, (err) => {
      console.warn('Realtime DB music subscription error:', err);
      musicLoaded = true;
      checkLoaded();
    });

    const unsubDesign = onValue(designRef, (snapshot) => {
      const data = snapshot.val();
      const list = [];
      if (data) {
        Object.entries(data).forEach(([key, val]) => {
          list.push({
            id: key,
            type: 'design',
            ...val,
          });
        });
      }
      list.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      setDesignProjects(list);
      designLoaded = true;
      checkLoaded();
    }, (err) => {
      console.warn('Realtime DB design subscription error:', err);
      designLoaded = true;
      checkLoaded();
    });

    const unsubTools = onValue(toolsRef, (snapshot) => {
      const data = snapshot.val();
      const list = [];
      if (data) {
        Object.entries(data).forEach(([key, val]) => {
          list.push({
            id: key,
            type: 'tools',
            ...val,
          });
        });
      }
      list.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
      setTools(list);
      toolsLoaded = true;
      checkLoaded();
    }, (err) => {
      console.warn('Realtime DB tools subscription error:', err);
      toolsLoaded = true;
      checkLoaded();
    });

    const unsubContact = onValue(contactRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setContactDetails(data);
      }
      contactLoaded = true;
      checkLoaded();
    }, (err) => {
      console.warn('Realtime DB contact subscription error:', err);
      contactLoaded = true;
      checkLoaded();
    });

    const unsubSocial = onValue(socialRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const list = Array.isArray(data) ? data.filter(Boolean) : Object.values(data);
        list.sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
        setSocialLinks(list);
      } else {
        setSocialLinks(defaultSocialLinks);
      }
      socialLoaded = true;
      checkLoaded();
    }, (err) => {
      console.warn('Realtime DB social subscription error:', err);
      socialLoaded = true;
      checkLoaded();
    });

    return () => {
      unsubMusic();
      unsubDesign();
      unsubTools();
      unsubContact();
      unsubSocial();
    };
  }, []);

  // Sync to local storage as fallback
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...musicProjects, ...designProjects]));
  }, [musicProjects, designProjects]);

  useEffect(() => {
    localStorage.setItem(TOOLS_STORAGE_KEY, JSON.stringify(tools));
  }, [tools]);

  const projects = useMemo(
    () => [...musicProjects, ...designProjects],
    [musicProjects, designProjects]
  );

  const featuredProjects = useMemo(
    () => projects.filter((p) => p.featured).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
    [projects]
  );

  const addProject = useCallback(async (type, payload) => {
    try {
      const nodeName = type === 'music' ? 'music_projects' : type === 'design' ? 'design_projects' : 'tools';
      const listRef = ref(rtdb, nodeName);
      const newRef = push(listRef);
      
      const currentList = type === 'music' ? musicProjects : type === 'design' ? designProjects : tools;
      const maxOrder = currentList.reduce((max, p) => Math.max(max, p.sortOrder ?? 0), -1);

      await set(newRef, {
        sortOrder: maxOrder + 1,
        featured: false,
        createdAt: Date.now(),
        ...payload,
      });
    } catch (err) {
      console.error('RTDB Add Error:', err);
    }
  }, [musicProjects, designProjects, tools]);

  const updateProject = useCallback(async (id, updates) => {
    try {
      const allItems = [...musicProjects, ...designProjects, ...tools];
      const item = allItems.find((p) => p.id === id);
      if (!item) return;

      const nodeName = item.type === 'music' ? 'music_projects' : item.type === 'design' ? 'design_projects' : 'tools';
      const itemRef = ref(rtdb, `${nodeName}/${id}`);
      await update(itemRef, updates);
    } catch (err) {
      console.error('RTDB Update Error:', err);
    }
  }, [musicProjects, designProjects, tools]);

  const deleteProject = useCallback(async (id) => {
    try {
      const allItems = [...musicProjects, ...designProjects, ...tools];
      const item = allItems.find((p) => p.id === id);
      if (!item) return;

      const nodeName = item.type === 'music' ? 'music_projects' : item.type === 'design' ? 'design_projects' : 'tools';
      const itemRef = ref(rtdb, `${nodeName}/${id}`);
      await remove(itemRef);
    } catch (err) {
      console.error('RTDB Delete Error:', err);
    }
  }, [musicProjects, designProjects, tools]);

  const toggleFeatured = useCallback(async (id) => {
    try {
      const allItems = [...musicProjects, ...designProjects, ...tools];
      const item = allItems.find((p) => p.id === id);
      if (!item) return;

      const nodeName = item.type === 'music' ? 'music_projects' : item.type === 'design' ? 'design_projects' : 'tools';
      const itemRef = ref(rtdb, `${nodeName}/${id}`);
      await update(itemRef, { featured: !item.featured });
    } catch (err) {
      console.error('RTDB Toggle Featured Error:', err);
    }
  }, [musicProjects, designProjects, tools]);

  const moveProject = useCallback(async (id, direction) => {
    try {
      const allItems = [...musicProjects, ...designProjects, ...tools];
      const item = allItems.find((p) => p.id === id);
      if (!item) return;

      const list = item.type === 'music' ? musicProjects : item.type === 'design' ? designProjects : tools;
      const index = list.findIndex((p) => p.id === id);
      const swapIndex = direction === 'up' ? index - 1 : index + 1;
      if (swapIndex < 0 || swapIndex >= list.length) return;

      const a = list[index];
      const b = list[swapIndex];

      const nodeName = item.type === 'music' ? 'music_projects' : item.type === 'design' ? 'design_projects' : 'tools';
      const aRef = ref(rtdb, `${nodeName}/${a.id}`);
      const bRef = ref(rtdb, `${nodeName}/${b.id}`);

      await update(aRef, { sortOrder: b.sortOrder });
      await update(bRef, { sortOrder: a.sortOrder });
    } catch (err) {
      console.error('RTDB Move Order Error:', err);
    }
  }, [musicProjects, designProjects, tools]);

  const updateContactDetails = useCallback(async (payload) => {
    try {
      const contactRef = ref(rtdb, 'contact_details');
      await set(contactRef, payload);
    } catch (err) {
      console.error('RTDB Update Contact Error:', err);
    }
  }, []);

  const updateSocialLinks = useCallback(async (linksList) => {
    try {
      const socialRef = ref(rtdb, 'social_links');
      await set(socialRef, linksList);
    } catch (err) {
      console.error('RTDB Update Socials Error:', err);
    }
  }, []);

  const value = useMemo(
    () => ({
      projects,
      musicProjects,
      designProjects,
      tools,
      featuredProjects,
      loading,
      addProject,
      updateProject,
      deleteProject,
      toggleFeatured,
      moveProject,
      contactDetails,
      socialLinks,
      updateContactDetails,
      updateSocialLinks,
    }),
    [
      projects,
      musicProjects,
      designProjects,
      tools,
      featuredProjects,
      loading,
      addProject,
      updateProject,
      deleteProject,
      toggleFeatured,
      moveProject,
      contactDetails,
      socialLinks,
      updateContactDetails,
      updateSocialLinks,
    ]
  );

  return <PortfolioContext.Provider value={value}>{children}</PortfolioContext.Provider>;
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}
