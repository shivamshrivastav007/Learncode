import { Application } from 'blocks/application';

export const build = async () => {
  Application.Logger.log('Build process is starting up...\n');
  Application.Logger.logProcessInfo();

  await Promise.all([
    Application.extractAndInitialize(),
    Application.ManifestWriter.write(),
  ]);

  await Promise.all([
    Application.AssetWriter.write(),
    Application.SearchIndexWriter.write(),
    Application.PageWriter.write(),
    Application.SitemapWriter.write(),
    Application.FeedWriter.write(),
    Application.ChirpWriter.write(),
  ]);
};

build();
