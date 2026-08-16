import { TWY_API_URL } from 'astro:env/server';

import { ApiResult } from '$lib/types/api';
import type { LatestBuildsResponse, PatchNote } from '$lib/types/api/builds';

const BUILDS_V1 = "api/builds/v1";

export const api = {
    builds: {
        v1: {
            async getLatestVersions(): Promise<ApiResult<LatestBuildsResponse>> {
                try {
                    const response = await fetch(`${TWY_API_URL}/${BUILDS_V1}/latest`, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        cache: "no-store",
                    });

                    if (!response.ok) {
                        console.error("Failed to load latest versions.", {
                            status: response.status,
                            statusText: response.statusText,
                        });
                        return ApiResult.failure<LatestBuildsResponse>("Failed to load latest versions.");
                    }

                    var obj = (await response.json()) as LatestBuildsResponse;

                    return ApiResult.success(obj);
                } catch (error: unknown) {
                    if (error instanceof Error)
                        return ApiResult.failure<LatestBuildsResponse>(error.message);

                    return ApiResult.failure<LatestBuildsResponse>("An unexpected error occured.");
                }
            },
            async getPatchNotes(): Promise<PatchNote[]> {
                try {
                    const response = await fetch(`${TWY_API_URL}/${BUILDS_V1}/patchNotes`, {
                        headers: {
                            "Content-Type": "application/json",
                        },
                        cache: "no-store",
                    });

                    if (!response.ok) {
                        console.error("Failed to load account.", {
                            status: response.status,
                            statusText: response.statusText,
                        });
                        return [];
                    }

                    return (await response.json()) as PatchNote[];

                } catch (error) {
                    return [];
                }
            }
        }
    }
}