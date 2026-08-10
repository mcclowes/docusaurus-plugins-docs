import React, { useEffect, useState, type CSSProperties } from 'react';
import styles from './styles.module.css';

type PackageMetadata = {
  description?: string;
  keywords?: string[];
  license?: string | string[];
  time?: Record<string, string>;
  versions?: Record<
    string,
    {
      keywords?: string[];
      license?: string | string[];
    }
  >;
  'dist-tags'?: { latest?: string };
};

type Props = {
  package: string;
  className?: string;
  style?: CSSProperties;
};

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(value);
}

export default function NpmPackageCard({
  package: packageName,
  className,
  style,
}: Props): React.ReactElement {
  const [data, setData] = useState<PackageMetadata | null>(null);
  const [downloads, setDownloads] = useState<number | null>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchPackage(): Promise<void> {
      setLoading(true);
      setError(false);

      try {
        const encodedName = encodeURIComponent(packageName);
        const [metadataResponse, downloadsResponse] = await Promise.all([
          fetch(`https://registry.npmjs.org/${encodedName}`, { signal: controller.signal }),
          fetch(`https://api.npmjs.org/downloads/point/last-week/${encodedName}`, {
            signal: controller.signal,
          }),
        ]);

        if (!metadataResponse.ok) {
          throw new Error(`Failed to load package: ${metadataResponse.status}`);
        }

        setData((await metadataResponse.json()) as PackageMetadata);

        if (downloadsResponse.ok) {
          const result = (await downloadsResponse.json()) as { downloads?: number };
          setDownloads(result.downloads ?? null);
        }
      } catch (fetchError) {
        if (!(fetchError instanceof DOMException && fetchError.name === 'AbortError')) {
          setError(true);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    void fetchPackage();
    return () => controller.abort();
  }, [packageName]);

  const latestVersion = data?.['dist-tags']?.latest;
  const latestVersionData = latestVersion ? data?.versions?.[latestVersion] : undefined;
  const keywords = latestVersionData?.keywords ?? data?.keywords ?? [];
  const license = latestVersionData?.license ?? data?.license;
  const publishedDate = latestVersion ? data?.time?.[latestVersion] : undefined;

  return (
    <a
      className={[styles.card, className].filter(Boolean).join(' ')}
      href={`https://www.npmjs.com/package/${packageName}`}
      target="_blank"
      rel="noopener noreferrer"
      style={style}
    >
      <div className={styles.header}>
        <div className={styles.packageName}>
          <span className={styles.packageIcon} aria-hidden="true">
            📦
          </span>
          {packageName}
        </div>
        {loading ? (
          <span className={styles.badge}>Loading…</span>
        ) : error ? (
          <span className={styles.errorBadge}>Unavailable</span>
        ) : latestVersion ? (
          <span className={styles.badge}>v{latestVersion}</span>
        ) : null}
      </div>

      <p className={styles.description}>
        {loading ? 'Fetching package details…' : data?.description || 'No description provided.'}
      </p>

      <div className={styles.metaRow}>
        {downloads !== null && (
          <span title="Downloads last week">⬇️ {formatNumber(downloads)}/wk</span>
        )}
        {license && (
          <span title="License">📄 {Array.isArray(license) ? license.join(', ') : license}</span>
        )}
        {publishedDate && (
          <span title="Last updated">⏱️ {new Date(publishedDate).toLocaleDateString()}</span>
        )}
      </div>

      {keywords.length > 0 && (
        <div className={styles.topics}>
          {keywords.slice(0, 6).map((keyword) => (
            <span key={keyword} className={styles.topic}>
              {keyword}
            </span>
          ))}
        </div>
      )}

      <svg className={styles.npmLogo} viewBox="0 0 27.23 27.23" aria-hidden="true">
        <rect width="27.23" height="27.23" rx="2" fill="#cb3837" />
        <polygon
          fill="#fff"
          points="5.8 21.75 13.66 21.75 13.67 9.98 17.59 9.98 17.58 21.76 21.51 21.76 21.52 6.06 5.82 6.04 5.8 21.75"
        />
      </svg>
    </a>
  );
}
