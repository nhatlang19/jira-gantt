const filterStory = (stories) => {
  const data = stories.issues.map((story) => {
    return {
        id: story.id,
        text: `${story.key} ${story.fields.summary}`,
        start_date: story.fields.status.name != 'Done' ? story.fields.customfield_10049 || story.fields.customfield_10015 || null : null,
        end_date: story.fields.status.name != 'Done' ? story.fields.customfield_10050 || story.fields.customfield_10048 || null : null,
        duration: story.fields.duration || 0,
        progress: story.fields.progress.total ||  0,
        status: (story.fields.status.name || '').toUpperCase(),
        open: true,
        parent: +story.fields.parent?.id || 0,
        type: story.fields.issuetype.name.toLowerCase(),
        detail: {...story}
    };
  });
  return {
    data,
    link: []
  }
}

module.exports = filterStory;