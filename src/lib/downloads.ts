import { TWY_CDN_URL } from "astro:env/server";

import { api } from "$lib/api";

import type { LatestBuildsResponse } from "$lib/types/api/builds";

import windowsIcon from "$assets/images/platforms/platform-windows.png";
import linuxIcon from "$assets/images/platforms/platform-linux.png";
import metaIcon from "$assets/images/platforms/platform-oculus.png";

export type DownloadPlatform = "windows" | "linux" | "meta";

export type DownloadOption = {
	platform: DownloadPlatform;
	label: string;
	version: string;
	href: string;
	icon: ImageMetadata;
};

type DownloadPlatformConfig = {
	platform: DownloadPlatform;
	label: string;
	icon: ImageMetadata;
	versionKey: keyof LatestBuildsResponse;
	fileNameOverride?: string;
};

export const downloadPlatforms: DownloadPlatformConfig[] = [
	{
		platform: "windows",
		label: "Windows",
		icon: windowsIcon,
		versionKey: "latestWindowsVersion",
	},
	{
		platform: "linux",
		label: "Linux",
		icon: linuxIcon,
		versionKey: "latestLinuxVersion",
	},
	{
		platform: "meta",
		label: "Oculus Quest",
		icon: metaIcon,
		versionKey: "latestMetaVersion",
		fileNameOverride: "android.apk"
	},
];

export const buildDownloadOptions = (
	latestVersions: LatestBuildsResponse,
): DownloadOption[] =>
	downloadPlatforms
	.filter(({ versionKey }) => latestVersions[versionKey] != null)
	.map(({ platform, label, icon, versionKey, fileNameOverride }) => {
		const version = latestVersions[versionKey]!;

		const fileName = fileNameOverride ? fileNameOverride : `${platform}.zip`;

		return {
			platform,
			label,
			version,
			href: `${TWY_CDN_URL}/builds/${encodeURIComponent(version)}/${fileName}`,
			icon,
		};
	});

export const getLatestDownloads = async (): Promise<DownloadOption[]> => {
	const latestVersions = await api.builds.v1.getLatestVersions();
	if (!latestVersions.success)
		return [];

	return buildDownloadOptions(latestVersions.data);
};
