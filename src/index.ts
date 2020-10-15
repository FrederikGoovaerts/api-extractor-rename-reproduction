export interface TextTrack {
    language: string;
}


export function createTextTrack(): TextTrack {
    return { language: 'english' };
}
