/* eslint-disable default-case */
export function formatDate (timestamp) {
    console.log(timestamp)
    const d = new Date(timestamp);
    const time = d.toLocaleTimeString('en-US');
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
}

function sortAscending(postsToSort, sortBy) {
    switch(sortBy){
        case 'timestamp':
            return postsToSort.sort((a, b) => a[sortBy] - b[sortBy]);
        case 'title':
            return postsToSort.sort((a, b) => a[sortBy] - b[sortBy]);
        case 'voteScore':
            return postsToSort.sort((a, b) => a[sortBy] - b[sortBy]);
        case 'commentCount':
    }       return postsToSort.sort((a, b) => a[sortBy] - b[sortBy]);
};

function sortDescending(postsToSort, sortBy) {
    switch(sortBy){
        case 'timestamp':
            return postsToSort.sort((a, b) => b[sortBy] - a[sortBy]);
        case 'title':
            return postsToSort.sort((a, b) => b[sortBy] - a[sortBy]);
        case 'voteScore':
            return postsToSort.sort((a, b) => b[sortBy] - a[sortBy]);
        case 'commentCount':
            return postsToSort.sort((a, b) => b[sortBy] - a[sortBy]);
    }       
};

export function sort (postsToSort, sortBy, order) {
    switch(order) {
        case 'descending': 
            return sortDescending(postsToSort,sortBy)
        case 'ascending':
            return sortAscending(postsToSort,sortBy)
        default:
            return postsToSort
    }
};

export const normalizeObjectById = postsList => postsList.reduce((acc, curr) => {
    acc = { // eslint-disable-line
      ...acc,
      [curr.id]: {
        ...curr,
      },
    };
    return acc;
  }, {});
  