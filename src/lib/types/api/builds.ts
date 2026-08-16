export interface LatestBuildsResponse {
    latestWindowsVersion: string | null;
    latestLinuxVersion: string | null;
    latestMetaVersion: string | null;
}

export interface PatchNote {
    version: string;
    date: string;
    changes: string[];
}