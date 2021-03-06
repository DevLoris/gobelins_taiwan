require("colors");
const logs = require("../../../helpers/logs-helper");
const { quickTemplate } = require("../../../helpers/template-helper");
const { Files } = require("@zouloux/files");
const debug = require("debug")("config:manage-readme");
const paths = require("../../../global.paths");
const config = require("../../../global.config");

/**
 * Manage README file
 * @description allow to copy README as README-framework
 * and create new project README with setup information
 * @returns {Promise<unknown>}
 */
const setupReadme = ({
  templatesPath = `${paths.taskSetupFolder}/templates`,
  readmeFilePath = paths.readme,
  fakeMode = config.fakeMode,
  logDoneDelay = config.logDelay,
  readmeFileName = "README.md",
  readmeTemplateFileName = "README.md.template",
  readmeFrameworkFileName = "README-framework.md",
  projectName = "[ PROJECT NAME ]",
  projectAuthor = "[ PROJECT AUTHOR ]",
  projectDescription = "[ PROJECT DESCRIPTION ]",
}) => {
  debug("setupReadme params", {
    templatesPath,
    readmeFilePath,
    readmeFileName,
    readmeFrameworkFileName,
    projectName,
    projectAuthor,
    projectDescription,
  });

  return new Promise(async (resolve) => {
    logs.start(
      `Change current ${readmeFileName} file as ${readmeFrameworkFileName}...`,
      true
    );

    // create new readme and add content on it
    debug("create new readme and add content on it...");
    if (!fakeMode) {
      await Files.new(readmeFrameworkFileName).write(
        Files.getFiles(readmeFilePath).read()
      );
      //if fake mode
    } else {
      debug("FakeMode is activated, do nothing.".red);
    }
    logs.note(`${readmeFrameworkFileName} is created.`);
    logs.done();

    // if file exist
    if (Files.getFiles(readmeFilePath).files.length > 0) {
      logs.start(`Remove ${readmeFilePath}...`);

      // if no fake mode
      debug("file exist, remove it...");
      if (!fakeMode) {
        Files.getFiles(readmeFilePath).remove();
        // else, if fake mode
      } else {
        debug("FakeMode is activated, do nothing.".red);
      }
      // if file doesn't exist
    } else {
      // else just log error
      logs.error(`${readmeFilePath} doesn't exist.`);
    }

    debug("create new template README.md from template");
    if (!fakeMode) {
      await Files.new(readmeFileName).write(
        quickTemplate(
          Files.getFiles(`${templatesPath}/${readmeTemplateFileName}`).read(),
          // replace these variables
          {
            projectName,
            projectDescription,
            projectAuthor,
          }
        )
      );
    } else {
      debug("FakeMode is activated, do nothing.".red);
    }

    logs.note(`${readmeFileName} is created.`);
    logs.done();
    setTimeout(resolve, logDoneDelay);
  });
};

module.exports = setupReadme;
