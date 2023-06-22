using Microsoft.AspNetCore.Mvc;
using System.Text;
using System.Text.Json;
using System.Text.RegularExpressions;
using WebMusic.Models;
using WebMusic.Models.Data;
using WebMusic.Models.EF;

namespace WebMusic.Common
{
    public class recommnend
    {
        private readonly MusicWebContext _context;
        public recommnend(MusicWebContext context)
        {
            _context = context;
        }
        public static async Task<List<int>> recommendSystem(int id, List<SongItem> list)
        {
            var items = list.FirstOrDefault(x=>x.idSong==id);
            StringBuilder data_str = new StringBuilder();
            List<string> data = new List<string>();
            List<int> setId = new List<int>();


            List<double> matrixs = new List<double>();
            List<double> matrixCos = new List<double>();
            List<double> matrixCos7 = new List<double>();


            List<int> setViTri = new List<int>();
            List<int> idkq = new List<int>();

            /*string key = songItem.Replace('-', ' ');
            key = Regex.Replace(key, @"[^a-zA-Z0-9\s]", "");*/
            //string[] keys = key.Split('-');

            // xử lý dữ liệu
            foreach (var word in list)
            {
                string alias = word.linksong!.Replace('-', ' ');
                string singer = word.linksinger!.Replace('-', ' ');
                string category = word.linkalbum!.Replace('-', ' ');
                string strData = Regex.Replace(alias, @"[^a-zA-Z0-9\s]", "") + " " + Regex.Replace(singer, @"[^a-zA-Z0-9\s]", "") + " " + Regex.Replace(category, @"[^a-zA-Z0-9\s]", "");
                //string strData = alias + " " + singer;

                int idTemp = (int)word.idSong!;
                data.Add(strData);
                setId.Add(idTemp);
                
            }
            double[,] matrix = new double[list.Count, data.Count];
            int vitri = 0;

            // lấy vị trí của giá trị cần đề xuất
            for (int i = 0; i < setId.Count; i++)
            {
                if (items.idSong == setId[i])
                {
                    setViTri.Add(i);
                }
            }
            //giá trị dùng để đề xuất theo
            /*for (int i = 0; i < list.Count; i++)
            {
                string keysong = list[i].linksong.Replace('-', ' ') +" "+ list[i].linksinger.Replace('-', ' ');
                //string keysong = songItem.Replace('-', ' ');
                string key = Regex.Replace(keysong, @"[^a-zA-Z0-9\s]", "");
                for (int j = 0; j < data.Count; j++)
                {
                    double sum = CalculateTF(key, data[j]);
                    matrixs.Add(sum);
                }
            }*/
            //tính tf tần xuất chữ xuất hiện
            /*for (int i = 0; i < list.Count; i++)
            {
                string keysong = list[i].linksong.Replace('-', ' ');
                string keysong1= list[i].linksinger.Replace('-', ' ');
                string keysong2 = list[i].linkalbum.Replace('-', ' ');
                //string keysong = songItem.Replace('-', ' ');
                string key = Regex.Replace(keysong, @"[^a-zA-Z0-9\s]", "") + " " + Regex.Replace(keysong1, @"[^a-zA-Z0-9\s]", "") + " " + Regex.Replace(keysong2, @"[^a-zA-Z0-9\s]", "");
                for (int j = 0; j < data.Count; j++)
                {
                    double sum = CalculateTF(key, data[j]);
                    //double sum = CalculateTF("a f c d", "a b d f");
                    matrixs.Add(sum);
                }
            }*/


            string keysong = list[setViTri[0]].linksong.Replace('-', ' ');
            string keysong1 = list[setViTri[0]].linksinger.Replace('-', ' ');
            string keysong2 = list[setViTri[0]].linkalbum.Replace('-', ' ');
            //string keysong = songItem.Replace('-', ' ');
            string key = Regex.Replace(keysong, @"[^a-zA-Z0-9\s]", "") + " " + Regex.Replace(keysong1, @"[^a-zA-Z0-9\s]", "") + " " + Regex.Replace(keysong2, @"[^a-zA-Z0-9\s]", "");
            for (int j = 0; j < data.Count; j++)
            {
                double sum = CalculateTF(key, data[j]);
                //double sum = CalculateTF("a f c d", "a b d f");
                matrixs.Add(sum);
            }

            /*for (int k = 1; k <= list.Count; k++)
            {
                int toado = setId[k];
                setViTri.Add(toado);
                for (int j = 1; j < list.Count; j++)
                {
                    double sum2 = 0;
                    int count = list.Count;
                    for (int i = 0; i < list.Count; i++)
                    {
                        sum2 += matrixs[(k - 1) * count + i] * matrixs[j * count + i];
                    }
                    matrixCos.Add(Math.Cos(1 - sum2));
                }
            }*/


            // tính cosin
           /* for (int j = 0; j < list.Count; j++)
            {
                double sum2 = 0;
                int count = list.Count;
                for (int i = 0; i < list.Count; i++)
                {
                    sum2 = matrixs[(setViTri[0]) * count + i] * matrixs[j * count + i];
                }
                if (sum2 > 0)
                {
                    double cos = Math.Cos(sum2);
                    matrixCos.Add(sum2);
                }
                else
                {
                    matrixCos.Add(sum2);
                }
                *//*double cos = Math.Cos(sum2);
                matrixCos.Add(cos);*//*
            }*/

            /*for(int i = 0; i < matrixCos.Count; i++)
            {
                if (matrixCos[i] > 0.7)
                {
                    matrixCos7.Add(matrixCos[i]);
                }
            }*/

            List<KeyValuePair<int, double>> sortedList = new List<KeyValuePair<int, double>>();
            for (int i = 0; i < matrixs.Count; i++)
            {
                sortedList.Add(new KeyValuePair<int, double>( i, matrixs[i]));
            }

            sortedList.Sort((a, b) => b.Value.CompareTo(a.Value));

            foreach (var item in sortedList)
            {
                if(item.Value > 0)
                {
                    idkq.Add(setId[item.Key]);
                }
                //matrixCos7.Add(item.Value);
            }

            /*List<KeyValuePair<double, int>> sortedList = new List<KeyValuePair<double, int>>();
            for (int i = 0; i < matrixCos.Count; i++)
            {
                sortedList.Add(new KeyValuePair<double, int>(matrixCos[i], i));
            }

            sortedList.Sort((a, b) => b.Key.CompareTo(a.Key));

            foreach (var item in sortedList)
            {
                idkq.Add(setId[item.Value]);
                matrixCos7.Add(item.Key);
            }*/



            return idkq;
        }

        public static double CalculateTF(string title, string content)
        {
            string[] words = content.ToLower().Split(' ');
            string[] termWords = title.ToLower().Split(' ');

            //in ra danh sach không trùng
            HashSet<string> title1 = new HashSet<string>();
            title1.Clear();

            foreach (string word in words)
            {
                if (!title1.Contains(word))
                {
                    title1.Add(word);
                }
            }

            HashSet<string> content1 = new HashSet<string>();
            content1.Clear();

            foreach (string word in termWords)
            {
                if (!content1.Contains(word))
                {
                    content1.Add(word);
                }
            }

            double termCount = 0;

            /*for (int i = 0; i < words.Length; i++)
            {
                for (int j = 0; j < termWords.Length; j++)
                {
                    if (words[i] == termWords[j])
                    {
                        termCount++;
                    }

                }

            }*/
            foreach (string titleWord in title1)
            {
                foreach (string contentWord in content1)
                {
                    if (titleWord == contentWord)
                    {
                        termCount++;
                    }
                }
            }

            //double tf = (double)termCount / termWords.Length;
            if (termCount > 0)
            {
                double tf = 1 + Math.Log10(termCount);
                return tf;
            }
            else
            {
                double tf = 0;
                return tf;
            }

        }


        public static async Task<List<int>> recommend_content(string content, List<SongItem> list)
        {
            StringBuilder data_str = new StringBuilder();
            List<string> data = new List<string>();
            List<int> setId = new List<int>();


            List<double> matrixs = new List<double>();
            List<double> matrixCos = new List<double>();
            List<double> matrixCos7 = new List<double>();


            List<int> setViTri = new List<int>();
            List<int> idkq = new List<int>();

            // xử lý dữ liệu
            foreach (var word in list)
            {
                string alias = word.linksong!.Replace('-', ' ');
                string singer = word.linksinger!.Replace('-', ' ');
                string category = word.linkalbum!.Replace('-', ' ');
                string strData = Regex.Replace(alias, @"[^a-zA-Z0-9\s]", "") + " " + Regex.Replace(singer, @"[^a-zA-Z0-9\s]", "") + " " + Regex.Replace(category, @"[^a-zA-Z0-9\s]", "");
                //string strData = alias + " " + singer;

                int idTemp = (int)word.idSong!;
                data.Add(strData);
                setId.Add(idTemp);

            }

            string keysong = FormatAlias.ConvertToEnglish(content);
            //string keysong = songItem.Replace('-', ' ');
            string key = Regex.Replace(keysong, @"[^a-zA-Z0-9\s]", "");
            for (int j = 0; j < data.Count; j++)
            {
                double sum = CalculateTF(key, data[j]);
                matrixs.Add(sum);
            }
            // sắp xếp
            List<KeyValuePair<int, double>> sortedList = new List<KeyValuePair<int, double>>();
            for (int i = 0; i < matrixs.Count; i++)
            {
                sortedList.Add(new KeyValuePair<int, double>(i, matrixs[i]));
            }

            sortedList.Sort((a, b) => b.Value.CompareTo(a.Value));

            foreach (var item in sortedList)
            {
                if(item.Value > 0)
                {
                    idkq.Add(setId[item.Key]);
                }
                //matrixCos7.Add(item.Value);
            }

            return idkq;
        }
    }
}
