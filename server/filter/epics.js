const filterEpics = (epics) => {
  const data = epics.issues.map((epic) => {
    return {
        id: epic.id,
        text: `${epic.key} ${epic.fields.summary}`,
        start_date: epic.fields.status.name != 'Done' ? epic.fields.customfield_10049 || epic.fields.customfield_10015 || null : null,
        end_date: epic.fields.status.name != 'Done' ? epic.fields.customfield_10050 || epic.fields.customfield_10048 || null : null,
        duration: epic.fields.duration || 0,
        progress: epic.fields.progress.total ||  0,
        status: (epic.fields.status.name || '').toUpperCase(),
        open: true,
        parent: 0,
        type: epic.fields.issuetype.name.toLowerCase(),
        detail: {...epic}
    };
  });
  return {
    data,
    link: []
  }
}

module.exports = filterEpics;