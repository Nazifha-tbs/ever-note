import { Injectable } from "@angular/core";
import { FilePath } from "@ionic-native/file-path/ngx";
import { File } from "@ionic-native/file/ngx";
import { Base64ToGallery } from "@ionic-native/base64-to-gallery/ngx";
@Injectable({
  providedIn: "root",
})
export class DocumentDataService {
  constructor(
    private file: File,
    public filePath: FilePath,
    private base64ToGallery: Base64ToGallery
  ) {}

  getFileName(fileData: any) {
    let file = fileData.substring(fileData.lastIndexOf("/") + 1);
    // fileData.replace(/^.*[\\\/]/, '');
    return file;
  }

  getFileExt(fileData: any) {
    let file = fileData.substr(fileData.lastIndexOf(".") + 1);
    return file;
  }

  makeFileIntoBlob(filePath: any, name: string, type: any) {
    let blob: any;
    console.log(filePath);
    console.log("File blob call");
    return new Promise((resolve, reject) => {
      this.file.resolveLocalFilesystemUrl(filePath).then((fileEntry: any) => {
        blob = filePath;
        fileEntry.file((resFile: any) => {
          console.log(resFile);
          if (fileEntry.isFile) {
            var reader = new FileReader();
            reader.onloadend = (evt: any) => {
              let imgBlob: any = new Blob([evt.target.result], { type: type });
              imgBlob.name = name;
              resolve(imgBlob);
            };
            reader.onerror = (e) => {
              alert("Failed file read: " + e.toString());
              reject(e);
            };

            reader.readAsArrayBuffer(resFile);
          }
        });
      });
    });
  }

  public folderName = "Ever Note";
  check_Folder() {
    this.file
      .checkDir(this.file.externalRootDirectory, this.folderName)
      .then((response: any) => {
        console.log("Directory already created");
        if (response === true) {
          this.check_DbFolder();
          this.check_SubFolder();
        }
      })
      .catch((error: any) => {
        this.create_Directory();
      });
  }

  create_Directory() {
    this.file
      .createDir(this.file.externalRootDirectory, this.folderName, false)
      .then((response: any) => {
        console.log("Ever Note Directory Created Successfully");
        this.check_DbFolder();
        this.check_SubFolder();
      })
      .catch((err: any) => {
        console.log("Directory Not Created");
      });
  }

  check_DbFolder() {
    this.file
      .checkDir(this.file.externalRootDirectory, this.folderName + "/Database")
      .then((result: any) => {
        if (result === true) {
          console.log("Database directory already created");
        }
      })
      .catch((err: any) => {
        this.create_DbFolder();
      });
  }

  create_DbFolder() {
    this.file
      .createDir(
        this.file.externalRootDirectory,
        this.folderName + "/Database",
        false
      )
      .then((response: any) => {
        console.log("Database directory created successfully");
      });
  }

  check_SubFolder() {
    this.file
      .checkDir(this.file.externalRootDirectory, this.folderName + "/Media")
      .then((response: any) => {
        if (response === true) {
          this.createImageFolder();
          this.createDocumentFolder();
          this.createAudioFolder();
        }
      })
      .catch((err: any) => {
        this.create_SubFolder();
      });
  }

  create_SubFolder() {
    this.file.createDir(this.file.externalRootDirectory, this.folderName + '/Media', false).then((response: any) => {
      console.log('Media Directory Created Successfully');
      this.createImageFolder();
      this.createDocumentFolder();
      this.createAudioFolder();
      this.createVideoFolder();
    }).catch((err: any) => {
      console.log('Directory Not Created');
    });
  }

  createImageFolder() {
    this.file
      .checkDir(
        this.file.externalRootDirectory,
        this.folderName + "/Media/Images"
      )
      .then((response: any) => {})
      .catch((err: any) => {
        this.file
          .createDir(
            this.file.externalRootDirectory,
            this.folderName + "/Media/Images",
            false
          )
          .then((response: any) => {
            console.log("Images Directory Created Successfully");
          })
          .catch((err: any) => {
            console.log("Directory Not Created");
          });
      });
  }

  createDocumentFolder() {
    this.file
      .checkDir(
        this.file.externalRootDirectory,
        this.folderName + "/Media/Documents"
      )
      .then((response: any) => {})
      .catch((err: any) => {
        this.file
          .createDir(
            this.file.externalRootDirectory,
            this.folderName + "/Media/Documents",
            false
          )
          .then((response: any) => {
            console.log("Documents Directory Created Successfully");
          })
          .catch((err: any) => {
            console.log("Directory Not Created");
          });
      });
  }
  createAudioFolder() {
    this.file
      .checkDir(
        this.file.externalRootDirectory,
        this.folderName + "/Media/Audio"
      )
      .then((response: any) => {})
      .catch((err: any) => {
        this.file
          .createDir(
            this.file.externalRootDirectory,
            this.folderName + "/Media/Audio",
            false
          )
          .then((response: any) => {
            console.log("Documents Directory Created Successfully");
          })
          .catch((err: any) => {
            console.log("Directory Not Created");
          });
      });
  }

  downloadImage(base64Data: any) {
    this.base64ToGallery
      .base64ToGallery(base64Data, { prefix: "img_", mediaScanner: true })
      .then(
        (res: any) => {
          let file = res.substring(res.lastIndexOf("/") + 1);
          this.moveImage(file);
        },
        (err) => console.log("Error saving image to gallery ", err)
      );
  }

  moveImage(val: any) {
    this.file
      .checkFile(this.file.externalRootDirectory + "Pictures", val)
      .then((result: boolean) => {
        //annoying quirk with plugin means 'result' wont return false, instead i have to use catch to know the file doesn't exist
        console.log(result, "result");
      })
      .catch((err) => {
        this.file
          .moveFile(
            this.file.externalRootDirectory + "Pictures",
            val,
            this.file.externalRootDirectory + this.folderName + "/Media/Images",
            val
          )
          .then((moveFile_val: any) => {
            console.log("Move", moveFile_val);
          });
      });
  }
  createVideoFolder() {
    this.file.checkDir(this.file.externalRootDirectory, this.folderName + '/Media/Video').then((response: any) => {
    }).catch((err: any) => {
      this.file.createDir(this.file.externalRootDirectory, this.folderName + '/Media/Video', false).then((response: any) => {
        console.log('Video Directory Created Successfully');
      }).catch((err: any) => {
        console.log('Directory Not Created');
      });
    });
  }

}
