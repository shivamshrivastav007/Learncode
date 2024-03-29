import pathSettings from '#settings/paths';
import globalSettings from '#settings/global';
import { Logger } from '#blocks/utilities/logger';
import { JSONHandler } from '#blocks/utilities/jsonHandler';

const { manifestCacheKey, websiteName, shortName } = globalSettings;
const outPath = `${pathSettings.publicPath}/manifest.webmanifest`;
const backgroundColor = '#07071c';
const themeColor = '#07071c';
const display = 'standalone';
const iconDimensions = [48, 72, 96, 144, 192, 256, 384, 512];
const iconPrefix = 'icon';

/**
 * Writes the manifest.webmanifest file.
 */
export class ManifestWriter {
  /**
   * Writes the manifest.webmanifest file.
   * @returns {Promise} A promise that will resolve when the manifest has been
   * written to disk.
   */
  static write = async () => {
    const logger = new Logger('ManifestWriter.write');
    // Do not convert these to camelCase, as the manifest requires them to be snake_cased.
    /* eslint-disable camelcase */
    const manifestObject = {
      name: `${websiteName}`,
      short_name: `${shortName}`,
      start_url: `/`,
      background_color: backgroundColor,
      theme_color: themeColor,
      display,
      icons: iconDimensions.map(d => ({
        src: `assets/icons/${iconPrefix}-${d}x${d}.png?v=${manifestCacheKey}`,
        sizes: `${d}x${d}`,
        type: 'image/png',
      })),
    };
    /* eslint-enable camelcase */
    logger.log(`Generating manifest.webmanifest...`);

    await JSONHandler.toFile(outPath, manifestObject);

    logger.success('Generating manifest complete');
  };
}
