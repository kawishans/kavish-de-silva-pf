import { useState } from 'react';
import { usePortfolio } from '../../context/PortfolioContext.jsx';

const inputClass =
  'w-full rounded-xl px-3 py-2 text-sm bg-white/10 dark:bg-black/20 border border-white/10 focus:outline-none focus:ring-2 focus:ring-primary/40';

function ProjectRow({ project, onMove, onToggleFeatured, onDelete, onEdit }) {
  const isTool = project.type === 'tools';

  return (
    <li className="glass-card p-4 flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
      <div className="min-w-0 flex-1">
        <p className="font-space font-semibold truncate">{project.title}</p>
        <p className="text-description text-xs text-[var(--text-muted)] truncate">
          {project.type === 'music'
            ? project.embedUrl || 'No embed URL'
            : isTool
            ? project.link || 'No tool link'
            : project.mediaSrc || 'No destination link'}
        </p>
        {project.type === 'design' && project.thumbnailUrl && (
          <p className="text-[10px] text-primary truncate mt-0.5">
            Thumbnail: {project.thumbnailUrl}
          </p>
        )}
        {isTool && project.thumb && (
          <p className="text-[10px] text-primary truncate mt-0.5">
            Thumbnail: {project.thumb}
          </p>
        )}
        {isTool && project.desc && (
          <p className="text-xs text-[var(--text-muted)]/70 italic line-clamp-1 mt-0.5">
            {project.desc}
          </p>
        )}
        {!isTool && project.description && (
          <p className="text-xs text-[var(--text-muted)]/70 italic line-clamp-1 mt-0.5">
            {project.description}
          </p>
        )}
        {!isTool && project.featured && (
          <span className="inline-block mt-1 text-xs px-2 py-0.5 rounded-full bg-secondary/20 text-secondary">
            Featured
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2 shrink-0">
        <button type="button" className="btn-ghost text-xs py-1.5 px-2" onClick={() => onMove(project.id, 'up')}>
          ↑
        </button>
        <button type="button" className="btn-ghost text-xs py-1.5 px-2" onClick={() => onMove(project.id, 'down')}>
          ↓
        </button>
        {!isTool && (
          <button type="button" className="btn-ghost text-xs py-1.5 px-2" onClick={() => onToggleFeatured(project.id)}>
            {project.featured ? 'Unfeature' : 'Feature'}
          </button>
        )}
        <button type="button" className="btn-ghost text-xs py-1.5 px-2" onClick={() => onEdit(project)}>
          Edit
        </button>
        <button
          type="button"
          className="btn-ghost text-xs py-1.5 px-2 text-red-400 hover:text-red-300"
          onClick={() => onDelete(project.id)}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default function ProjectManager({ type, label }) {
  const {
    musicProjects,
    designProjects,
    tools,
    addProject,
    updateProject,
    deleteProject,
    toggleFeatured,
    moveProject,
  } = usePortfolio();

  const isTool = type === 'tools';
  const list = type === 'music' ? musicProjects : type === 'design' ? designProjects : tools;
  const [editing, setEditing] = useState(null);

  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    embedUrl: '',
    thumbnailUrl: '',
  });

  const resetForm = () => {
    setEditing(null);
    setForm({
      title: '',
      category: '',
      description: '',
      embedUrl: '',
      thumbnailUrl: '',
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;

    const payload =
      type === 'music'
        ? {
            title: form.title.trim(),
            category: form.category.trim(),
            description: form.description.trim(),
            embedUrl: form.embedUrl.trim(),
          }
        : type === 'design'
        ? {
            title: form.title.trim(),
            category: form.category.trim(),
            description: form.description.trim(),
            mediaSrc: form.embedUrl.trim(),
            thumbnailUrl: form.thumbnailUrl.trim(),
            mediaType: 'embed',
          }
        : {
            title: form.title.trim(),
            desc: form.description.trim(),
            thumb: form.thumbnailUrl.trim(),
            link: form.embedUrl.trim(),
          };

    if (editing) {
      updateProject(editing.id, payload);
    } else {
      addProject(type, payload);
    }
    resetForm();
  };

  const startEdit = (project) => {
    setEditing(project);
    setForm({
      title: project.title,
      category: project.category || '',
      description: project.type === 'tools' ? project.desc || '' : project.description || '',
      embedUrl: project.type === 'music' ? project.embedUrl : project.type === 'tools' ? project.link || '' : project.mediaSrc || '',
      thumbnailUrl: project.type === 'tools' ? project.thumb || '' : project.thumbnailUrl || '',
    });
  };

  return (
    <section className="glass-panel p-6 space-y-6">
      <div>
        <h2 className="font-space font-semibold text-lg">{label}</h2>
        <p className="text-description text-sm text-[var(--text-muted)]">
          {isTool
            ? 'Add, edit, delete, and reorder active utilities on the public tools grid.'
            : 'Add, edit, delete, reorder, and mark featured. Featured items appear on the home page.'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 border border-white/10 rounded-xl p-4">
        <h3 className="text-sm font-medium">{editing ? 'Edit resource' : 'Add resource'}</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs mb-1">{isTool ? 'Tool Name' : 'Title'}</label>
            <input
              className={inputClass}
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              required
            />
          </div>
          {!isTool && (
            <div>
              <label className="block text-xs mb-1">Category / genre</label>
              <input
                className={inputClass}
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                placeholder={type === 'music' ? 'Hip-Hop' : 'Branding'}
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-xs mb-1">Description</label>
          <textarea
            className={`${inputClass} min-h-[80px]`}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder={isTool ? 'Describe what this tool does...' : 'Describe this project in a few elegant sentences...'}
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-xs mb-1">
              {type === 'music' ? 'YouTube / SoundCloud Link' : isTool ? 'Tool Action / Website Link' : 'Project Embed or Destination Link'}
            </label>
            <input
              className={inputClass}
              value={form.embedUrl}
              onChange={(e) => setForm((f) => ({ ...f, embedUrl: e.target.value }))}
              placeholder="https://..."
              required
            />
          </div>
          {(type === 'design' || isTool) && (
            <div>
              <label className="block text-xs mb-1">
                {isTool ? 'Thumbnail Image URL' : 'Thumbnail Image URL (Optional for YouTube)'}
              </label>
              <input
                className={inputClass}
                value={form.thumbnailUrl}
                onChange={(e) => setForm((f) => ({ ...f, thumbnailUrl: e.target.value }))}
                placeholder="https://..."
                required={isTool}
              />
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <button type="submit" className="btn-primary text-sm">
            {editing ? 'Save changes' : isTool ? 'Add tool' : 'Add project'}
          </button>
          {editing && (
            <button type="button" className="btn-ghost text-sm" onClick={resetForm}>
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-3">
        {list.length === 0 ? (
          <p className="text-description text-sm text-[var(--text-muted)]">No resources added yet.</p>
        ) : (
          list.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              onMove={moveProject}
              onToggleFeatured={toggleFeatured}
              onDelete={deleteProject}
              onEdit={startEdit}
            />
          ))
        )}
      </ul>
    </section>
  );
}
