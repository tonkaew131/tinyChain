const fetchProject = async () => {
    const response = await fetch('/api/project');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};

const fetchProjectThumbnail = async (id: string) => {
    const response = await fetch(`/api/project/${id}/thumbnail`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    // const data = await response.json();
    return response;
};

const _fetchProjectDetail = async (id: string) => {
    const response = await fetch(`/api/project/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data;
};

export { fetchProject, fetchProjectThumbnail };
