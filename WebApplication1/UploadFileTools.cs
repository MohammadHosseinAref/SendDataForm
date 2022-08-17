using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UploadFile
{
    public class UploadFileTools
    {
        private string _path = string.Empty;
        private string _fileType = string.Empty;
        private string _filename = string.Empty;
        private IFormFile _file = null;

        public string path
        {
            get { return this._path; }
            set { this._path = value; }
        }
        public string FileType
        {
            get { return this._fileType; }
            set { this._fileType = value; }
        }
        public IFormFile file
        {
            get { return file; }
            set { this._file = value; }
        }
        public string Filename
        {
            get { return _filename; }
            set { _filename = value; }
        }

        public bool WriteToFileHTML(string Text)
        {
            try
            {

                //Check Whether directory exist or not if not then create it
                if (!Directory.Exists(_path))
                {
                    Directory.CreateDirectory(_path);
                }

                string FilePath = _path + "\\" + _filename + ".html";
                //Check Whether file exist or not if not then create it new else append on same file
                if (!System.IO.File.Exists(FilePath))
                {
                    System.IO.File.WriteAllText(FilePath, Text);
                }
                else
                {
                    Text = $"{Environment.NewLine}{Text}";
                    System.IO.File.WriteAllText(FilePath, Text);
                    //System.IO.File.AppendAllText(FilePath, Text);
                }
                return true;
            }
            catch (Exception)
            {

                throw;
            }

        }

        public bool Upload()
        {
            try
            {
                if (!Directory.Exists(_path))
                {
                    Directory.CreateDirectory(_path);
                }

                string filePath = string.Format("{0}{1}{2}", _path, _filename, _fileType);
                if (_file.Length > 0)
                {
                    using (var fileStream = new FileStream(filePath, FileMode.Create))
                    {
                        _file.CopyTo(fileStream);
                return true;
                    }
                }else
                    throw new Exception("فایل مشکل دارد");

            }
            catch
            {
                throw new Exception("خطا!!! فایل شما آپلود نشد");
            }
        }

        public void RemoveFile(string path = null)
        {
            string serverPath = path;
            if (string.IsNullOrEmpty(serverPath))
                serverPath = string.Format("{0}{1}{2}", _path, _filename, _fileType);
            if (File.Exists(serverPath))
            {
                File.Delete(serverPath);
            }

        }
        public string ReadFile()
        {
            try
            {

            var fileStream = new FileStream(_path, FileMode.Open, FileAccess.Read);
            using (var streamReader = new StreamReader(fileStream, Encoding.UTF8))
            {
                return streamReader.ReadToEnd();
            }
            }
            catch 
            {
                return "";
            }
        }
    }

}
