# Skin Pack Instructions

Using a Linux or Mac device:

1. Install [Node.js](https://nodejs.org/en/)
2. Install [Yarn](https://yarnpkg.com/en/)
3. Install [dos2unix](https://formulae.brew.sh/formula/dos2unix)
4. Download the contents of this repository
5. Copy the default skin pack directory from the VCC, version 1096 (typically ```C:\Program Files\Qumu\tomcat\base\webapps\viewerportal\WEB-INF\skinresources\default```) into the downloaded directory (i.e. ```~/Desktop/skin-pack-files/default```)
6. Using a terminal, navigate to the downloaded directory  (i.e. ```~/Desktop/skin-pack-files```)
7. Run the following commands:
  ```bash
  yarn install
  yarn extract
  yarn package
  ```

The compiled skin pack will be available at ```devtube.1096.zip```
