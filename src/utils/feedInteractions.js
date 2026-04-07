/**
 * Feed Interactions Manager
 * Handles likes, bookmarks, comments with localStorage persistence
 */

const INTERACTIONS_KEY = 'buildproof_interactions';

export const initializeInteractions = () => {
    const existing = localStorage.getItem(INTERACTIONS_KEY);
    if (!existing) {
        localStorage.setItem(INTERACTIONS_KEY, JSON.stringify({
            likes: {}, // postId: true/false
            bookmarks: {}, // postId: true/false
            comments: {}, // postId: [{id, text, author, timestamp}]
        }));
    }
};

export const getInteractions = () => {
    try {
        const data = localStorage.getItem(INTERACTIONS_KEY);
        return data ? JSON.parse(data) : { likes: {}, bookmarks: {}, comments: {} };
    } catch (error) {
        console.error('Failed to get interactions:', error);
        return { likes: {}, bookmarks: {}, comments: {} };
    }
};

export const saveInteractions = (interactions) => {
    try {
        localStorage.setItem(INTERACTIONS_KEY, JSON.stringify(interactions));
    } catch (error) {
        console.error('Failed to save interactions:', error);
    }
};

// ============= LIKE MANAGEMENT =============

export const toggleLike = (postId) => {
    const interactions = getInteractions();
    interactions.likes[postId] = !interactions.likes[postId];
    saveInteractions(interactions);
    return interactions.likes[postId];
};

export const isPostLiked = (postId) => {
    const interactions = getInteractions();
    return interactions.likes[postId] || false;
};

export const getLikesCount = (postId, originalCount = 0) => {
    const isLiked = isPostLiked(postId);
    return isLiked ? originalCount + 1 : originalCount;
};

// ============= BOOKMARK MANAGEMENT =============

export const toggleBookmark = (postId) => {
    const interactions = getInteractions();
    interactions.bookmarks[postId] = !interactions.bookmarks[postId];
    saveInteractions(interactions);
    return interactions.bookmarks[postId];
};

export const isPostBookmarked = (postId) => {
    const interactions = getInteractions();
    return interactions.bookmarks[postId] || false;
};

export const getAllBookmarks = () => {
    const interactions = getInteractions();
    return Object.entries(interactions.bookmarks)
        .filter(([_, value]) => value === true)
        .map(([key]) => key);
};

// ============= COMMENT MANAGEMENT =============

export const addComment = (postId, text, author = 'Current User') => {
    const interactions = getInteractions();
    if (!interactions.comments[postId]) {
        interactions.comments[postId] = [];
    }

    const comment = {
        id: Date.now().toString(),
        text,
        author,
        timestamp: new Date().toISOString(),
    };

    interactions.comments[postId].push(comment);
    saveInteractions(interactions);
    return comment;
};

export const getComments = (postId) => {
    const interactions = getInteractions();
    return interactions.comments[postId] || [];
};

export const deleteComment = (postId, commentId) => {
    const interactions = getInteractions();
    if (interactions.comments[postId]) {
        interactions.comments[postId] = interactions.comments[postId].filter(c => c.id !== commentId);
        saveInteractions(interactions);
        return true;
    }
    return false;
};

export const getCommentCount = (postId, originalCount = 0) => {
    const comments = getComments(postId);
    return originalCount + comments.length;
};

// ============= BULK OPERATIONS =============

export const clearAllInteractions = () => {
    localStorage.removeItem(INTERACTIONS_KEY);
    initializeInteractions();
};
