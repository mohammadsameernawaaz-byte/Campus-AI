import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, CheckCircle2, Circle, Plus, Clock, ArrowRight, Trash2 } from 'lucide-react';

export const StudyPlanView = () => {
  const { studyPlans = [], toggleStudyTask, addStudyPlan, documents = [], calculatedMetrics = {} } = useApp();
  const [activePlanId, setActivePlanId] = useState(studyPlans[0]?.id || '');
  const [showCreateModal, setShowCreateModal] = useState(false);

  // New Plan Form State
  const [newTitle, setNewTitle] = useState('');
  const [newExamDate, setNewExamDate] = useState('2026-11-20');
  const [newSubject, setNewSubject] = useState(documents[0]?.subject || 'Computer Science');
  const [newTaskDayCount, setNewTaskDayCount] = useState(7);

  const activePlan = studyPlans.find(p => p.id === activePlanId) || studyPlans[0];

  const handleCreatePlan = (e) => {
    e.preventDefault();
    if (!newTitle || !newExamDate) return;

    // Generate day-by-day tasks based on day count
    const generatedTasks = [];
    for (let i = 1; i <= newTaskDayCount; i++) {
      generatedTasks.push({
        id: `task-gen-${Date.now()}-${i}`,
        day: `Day ${i}`,
        task: i === 1
          ? "Read unit summaries and high-level architecture overview."
          : i === 2
          ? "Solve 2-mark definitions and verify formula identities."
          : i === Math.floor(newTaskDayCount / 2)
          ? "Attempt timed diagnostic practice quiz on Section A topics."
          : i === newTaskDayCount - 1
          ? "Solve 10-mark long essay questions and algorithm trace numericals."
          : i === newTaskDayCount
          ? "Final oral viva simulation and rapid flashcard deck drills."
          : `Review syllabus sub-topics and practice model answers for Unit ${i}.`,
        completed: false
      });
    }

    const createdPlan = {
      id: `sp-${Date.now()}`,
      title: newTitle,
      targetDate: newExamDate,
      subject: newSubject,
      status: "Active",
      tasks: generatedTasks
    };

    addStudyPlan(createdPlan);
    setActivePlanId(createdPlan.id);
    setShowCreateModal(false);
    setNewTitle('');
  };

  const calculateDaysLeft = (targetDateStr) => {
    const today = new Date();
    const target = new Date(targetDateStr);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  if (!activePlan) {
    return (
      <div className="card" style={{ padding: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>Exam Countdown Study Planner</h1>
        <p style={{ marginTop: '0.75rem', color: 'var(--ink-secondary)' }}>
          No active study plans found.
        </p>
        <button onClick={() => setShowCreateModal(true)} className="btn btn-primary" style={{ marginTop: '1.25rem' }}>
          <Plus size={16} />
          <span>Create New Study Plan</span>
        </button>
      </div>
    );
  }

  const completedCount = activePlan.tasks.filter(t => t.completed).length;
  const progressPercent = activePlan.tasks.length > 0 ? Math.round((completedCount / activePlan.tasks.length) * 100) : 0;
  const daysLeft = calculateDaysLeft(activePlan.targetDate);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
            Exam Countdown Study Planner
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--ink-secondary)', marginTop: '0.25rem' }}>
            Day-by-day revision checklist where completing tasks updates your overall exam readiness meter.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="btn btn-primary"
        >
          <Plus size={16} />
          <span>Create New Plan</span>
        </button>
      </div>

      {/* Plan Header Card */}
      <div className="card" style={{ padding: '2rem', backgroundColor: 'var(--bg-surface)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span className="badge badge-coral">{activePlan.status}</span>
              <span style={{ fontSize: '0.8rem', color: 'var(--ink-muted)' }}>Subject: {activePlan.subject}</span>
            </div>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--ink-primary)' }}>
              {activePlan.title}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem', fontSize: '0.875rem', color: 'var(--ink-secondary)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Calendar size={15} color="var(--brand-coral)" />
                Target Exam Date: <strong>{new Date(activePlan.targetDate).toLocaleDateString()}</strong>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                <Clock size={15} color="var(--brand-teal)" />
                Countdown: <strong>{daysLeft} days remaining</strong>
              </span>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--ink-muted)', textTransform: 'uppercase' }}>
              Plan Completion
            </div>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--brand-coral)' }}>
              {progressPercent}%
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--ink-muted)' }}>
              {completedCount} of {activePlan.tasks.length} tasks completed
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--bg-muted)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{ width: `${progressPercent}%`, height: '100%', backgroundColor: 'var(--brand-coral)', transition: 'width 0.3s ease' }} />
        </div>
      </div>

      {/* Day-by-Day Task Checklist */}
      <div className="card" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '1.25rem' }}>
          Revision Task Checklist
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {activePlan.tasks.map((task) => (
            <div
              key={task.id}
              onClick={() => toggleStudyTask(activePlan.id, task.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '1rem 1.25rem',
                borderRadius: 'var(--radius-btn)',
                border: task.completed ? '1px solid #C3E6CB' : '1px solid var(--border-subtle)',
                backgroundColor: task.completed ? 'rgba(212, 237, 218, 0.25)' : 'var(--bg-surface)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{ color: task.completed ? 'var(--brand-teal)' : 'var(--border-medium)', flexShrink: 0 }}>
                {task.completed ? <CheckCircle2 size={22} /> : <Circle size={22} />}
              </div>

              <div style={{ flex: 1 }}>
                <span className="badge" style={{ fontSize: '0.7rem', marginRight: '0.5rem', backgroundColor: 'var(--bg-muted)' }}>
                  {task.day}
                </span>
                <span style={{
                  fontSize: '0.95rem',
                  color: task.completed ? 'var(--ink-secondary)' : 'var(--ink-primary)',
                  textDecoration: task.completed ? 'line-through' : 'none',
                  fontWeight: task.completed ? 400 : 600
                }}>
                  {task.task}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create New Plan Modal */}
      {showCreateModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(21, 21, 21, 0.65)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="card"
            style={{ width: '100%', maxWidth: '520px', padding: '2rem', backgroundColor: 'var(--bg-surface)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '0.5rem' }}>
              Create Exam Revision Schedule
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--ink-secondary)', marginBottom: '1.5rem' }}>
              Set your examination date and select syllabus units to generate a structured timeline.
            </p>

            <form onSubmit={handleCreatePlan} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Study Plan Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Mid-Term DBMS & Algorithms Review"
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Target Examination Date *
                </label>
                <input
                  type="date"
                  required
                  value={newExamDate}
                  onChange={(e) => setNewExamDate(e.target.value)}
                  style={{ width: '100%' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Course Subject
                </label>
                <select
                  value={newSubject}
                  onChange={(e) => setNewSubject(e.target.value)}
                  style={{ width: '100%' }}
                >
                  {documents.map(d => (
                    <option key={d.id} value={d.subject}>{d.subject} ({d.name})</option>
                  ))}
                  <option value="General Semester Review">General Semester Review</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, marginBottom: '0.35rem' }}>
                  Revision Duration (Days)
                </label>
                <select
                  value={newTaskDayCount}
                  onChange={(e) => setNewTaskDayCount(Number(e.target.value))}
                  style={{ width: '100%' }}
                >
                  <option value={5}>5 Days (Intensive Cram)</option>
                  <option value={7}>7 Days (Standard Week Review)</option>
                  <option value={14}>14 Days (Comprehensive Preparation)</option>
                  <option value={21}>21 Days (Full Semester Pacing)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Generate Plan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
