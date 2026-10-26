import React, { useState, useRef, useEffect } from 'react';
import { Search, Check, ChevronDown, Building, Plus } from 'lucide-react';

export const Combobox = ({
  options = [],
  value = '',
  onChange,
  placeholder = 'Search or enter institution name...',
  label = 'College / University',
  required = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState(value);
  const wrapperRef = useRef(null);

  // Sync internal search state with external value changes
  useEffect(() => {
    setSearch(value);
  }, [value]);

  // Click away listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt =>
    opt.toLowerCase().includes((search || '').toLowerCase())
  );

  const handleSelect = (selectedName) => {
    setSearch(selectedName);
    onChange(selectedName);
    setIsOpen(false);
  };

  const handleInputChange = (e) => {
    const val = e.target.value;
    setSearch(val);
    onChange(val);
    setIsOpen(true);
  };

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%' }}>
      {label && (
        <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--ink-primary)' }}>
          {label} {required && '*'}
        </label>
      )}

      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input
          type="text"
          value={search}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          required={required}
          style={{
            width: '100%',
            paddingRight: '2.5rem',
            paddingLeft: '0.85rem'
          }}
          aria-expanded={isOpen}
          aria-autocomplete="list"
        />
        <button
          type="button"
          onClick={() => setIsOpen(prev => !prev)}
          tabIndex={-1}
          style={{
            position: 'absolute',
            right: '0.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.35rem',
            color: 'var(--ink-muted)',
            display: 'flex',
            alignItems: 'center'
          }}
          aria-label="Toggle options"
        >
          <ChevronDown size={16} aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          maxHeight: '260px',
          overflowY: 'auto',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-strong)',
          borderRadius: 'var(--radius-card)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1000,
          padding: '0.35rem'
        }}>
          {/* Header indicator */}
          <div style={{
            padding: '0.4rem 0.65rem',
            fontSize: '0.72rem',
            fontWeight: 700,
            color: 'var(--ink-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            borderBottom: '1px solid var(--border-subtle)',
            marginBottom: '0.25rem'
          }}>
            Select from Registry or Type Custom
          </div>

          {/* Option list */}
          {filteredOptions.length > 0 ? (
            filteredOptions.map((opt) => {
              const isSelected = opt.toLowerCase() === (value || '').toLowerCase();
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => handleSelect(opt)}
                  style={{
                    width: '100%',
                    padding: '0.55rem 0.75rem',
                    textAlign: 'left',
                    fontSize: '0.85rem',
                    fontWeight: isSelected ? 700 : 500,
                    backgroundColor: isSelected ? 'var(--bg-muted)' : 'transparent',
                    color: isSelected ? 'var(--brand-coral)' : 'var(--ink-primary)',
                    borderRadius: 'var(--radius-btn)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.5rem',
                    cursor: 'pointer'
                  }}
                  className="combobox-item"
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                    <Building size={14} style={{ flexShrink: 0, color: 'var(--ink-muted)' }} aria-hidden="true" />
                    <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>{opt}</span>
                  </div>
                  {isSelected && <Check size={14} color="var(--brand-coral)" aria-hidden="true" />}
                </button>
              );
            })
          ) : (
            <div style={{ padding: '0.75rem', fontSize: '0.825rem', color: 'var(--ink-secondary)' }}>
              No matching institution found in registry.
            </div>
          )}

          {/* Custom option prompt */}
          {search && !options.some(opt => opt.toLowerCase() === search.toLowerCase()) && (
            <button
              type="button"
              onClick={() => handleSelect(search)}
              style={{
                width: '100%',
                padding: '0.6rem 0.75rem',
                textAlign: 'left',
                fontSize: '0.85rem',
                fontWeight: 600,
                backgroundColor: 'var(--bg-soft-accent)',
                color: 'var(--brand-coral)',
                borderRadius: 'var(--radius-btn)',
                border: '1px solid rgba(217, 45, 32, 0.2)',
                marginTop: '0.35rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                cursor: 'pointer'
              }}
            >
              <Plus size={14} aria-hidden="true" />
              <span>Use custom institution: "{search}"</span>
            </button>
          )}
        </div>
      )}

      <style>{`
        .combobox-item:hover {
          background-color: var(--bg-muted) !important;
          color: var(--ink-primary) !important;
        }
      `}</style>
    </div>
  );
};
