'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Deliverable {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'pending';
}

interface DeliverablePickerProps {
  isOpen: boolean;
  onSelect: (deliverable: Deliverable) => void;
  onClose: () => void;
  searchTerm: string;
}

export default function DeliverablePicker({ isOpen, onSelect, onClose, searchTerm }: DeliverablePickerProps) {
  const [deliverables, setDeliverables] = useState<Deliverable[]>([]);

  // fetch real deliverables once picker opens for first time
  useEffect(() => {
    if (!isOpen || deliverables.length > 0) return;
    fetch('/api/executions?type=pipeline:deliverables')
      .then(res => res.ok ? res.json() : [])
      .then(data => {
        if (Array.isArray(data)) {
          setDeliverables(data.map((d: any) => ({
            id: d.id,
            title: d.title || d.name || 'Untitled',
            description: d.description || '',
            status: d.status || 'completed',
          })));
        }
      })
      .catch(() => {});
  }, [isOpen]);

  const [filteredDeliverables, setFilteredDeliverables] = useState<Deliverable[]>(deliverables);

  // Filter deliverables based on search term
  useEffect(() => {
    if (!searchTerm) {
      setFilteredDeliverables(deliverables);
      return;
    }

    const filtered = deliverables.filter(
      deliverable =>
        deliverable.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deliverable.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredDeliverables(filtered);
  }, [searchTerm, deliverables]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        className="picker-container"
      >
        <div className="picker-header">DELIVERABLES</div>

        {filteredDeliverables.length > 0 ? (
          filteredDeliverables.map(deliverable => (
            <div
              key={deliverable.id}
              className="picker-item"
              onClick={() => {
                onSelect(deliverable);
                onClose();
              }}
            >
              <div className="picker-item-title">
                {deliverable.title}
                <span
                  style={{
                    marginLeft: '0.5rem',
                    fontSize: '0.7rem',
                    padding: '0.125rem 0.375rem',
                    borderRadius: '4px',
                    backgroundColor:
                      deliverable.status === 'completed' ? 'rgba(16, 185, 129, 0.1)' :
                        deliverable.status === 'in-progress' ? 'rgba(245, 158, 11, 0.1)' :
                          'rgba(107, 114, 128, 0.1)',
                    color:
                      deliverable.status === 'completed' ? '#10b981' :
                        deliverable.status === 'in-progress' ? '#f59e0b' :
                          '#6b7280',
                  }}
                >
                  {deliverable.status === 'completed' ? 'Completed' :
                    deliverable.status === 'in-progress' ? 'In Progress' :
                      'Pending'}
                </span>
              </div>
              <div className="picker-item-description">{deliverable.description}</div>
            </div>
          ))
        ) : (
          <div className="picker-empty">
            No deliverables found matching "{searchTerm}"
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
