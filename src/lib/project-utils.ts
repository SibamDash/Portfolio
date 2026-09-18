export type ProjectDestinationInfo = {
  url: string;
  type: 'live' | 'github';
  label: string;
};

/**
 * Determines the primary destination URL for a project based on its available URLs.
 * Follows the automatic fallback rules: Live URL > Repository URL.
 */
export function getProjectDestination(project: { liveUrl?: string | null; repositoryUrl?: string | null }): ProjectDestinationInfo | null {
  if (project.liveUrl && isValidHttpUrl(project.liveUrl)) {
    return {
      url: project.liveUrl,
      type: 'live',
      label: 'Live Project'
    };
  }
  
  if (project.repositoryUrl && isValidHttpUrl(project.repositoryUrl)) {
    return {
      url: project.repositoryUrl,
      type: 'github',
      label: 'GitHub Repo'
    };
  }

  return null;
}

/**
 * Validates that a string is a valid HTTP/HTTPS URL and avoids unsafe protocols like javascript:.
 */
export function isValidHttpUrl(string: string): boolean {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}
