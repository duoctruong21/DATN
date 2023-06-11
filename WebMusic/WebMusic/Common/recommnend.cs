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
        public static async Task<List<int>> recommendSystem(string songItem, List<SongItem> list)
        {
            var items = list.FirstOrDefault(x => x.linksong.Contains(songItem));
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

            foreach (var word in list)
            {
                string alias = word.linksong.Replace('-', ' ');
                string singer = word.linksinger.Replace('-', ' ');
                string strData = Regex.Replace(alias, @"[^a-zA-Z0-9\s]", "") + " " + Regex.Replace(singer, @"[^a-zA-Z0-9\s]", "");

                int idTemp = (int)word.idSong;
                data.Add(strData);
                setId.Add(idTemp);

            }
            double[,] matrix = new double[list.Count, data.Count];
            int vitri = 0;

            for (int i = 0; i < list.Count; i++)
            {
                string key = list[i].linksong.Replace('-', ' ');
                key = Regex.Replace(key, @"[^a-zA-Z0-9\s]", "");

                for (int j = 0; j < data.Count; j++)
                {
                    double sum = CalculateTF(key, data[j]);
                    matrixs.Add(sum);
                }
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

            for ( int i=0; i<setId.Count;i++ )
            {
                if(items.idSong == setId[i])
                {
                    setViTri.Add(i);
                }
            }
            
            for (int j = 0; j < list.Count; j++)
            {
                double sum2 = 0;
                int count = list.Count;
                for (int i = 0; i < list.Count; i++)
                {
                    sum2 += matrixs[(setViTri[0]) * count + i] * matrixs[j * count + i];
                }
                matrixCos.Add(Math.Cos(1 - sum2));
            }

            for(int i = 0; i < matrixCos.Count; i++)
            {
                if (matrixCos[i] > 0.7)
                {
                    matrixCos7.Add(matrixCos[i]);
                }
            }

            List<KeyValuePair<double, int>> sortedList = new List<KeyValuePair<double, int>>();
            for (int i = 0; i < matrixCos.Count; i++)
            {
                sortedList.Add(new KeyValuePair<double, int>(matrixCos[i], i));
            }

            sortedList.Sort((a, b) => a.Key.CompareTo(b.Key));

            foreach (var item in sortedList)
            {
                idkq.Add(setId[item.Value]);
            }



            return idkq;
        }

        public static double CalculateTF(string title, string content)
        {
            string[] words = content.ToLower().Split(' ');

            int termCount = 0;
            string[] termWords = title.ToLower().Split(' ');

            for (int i = 0; i < words.Length ; i++)
            {
                for (int j = 0; j < termWords.Length; j++)
                {
                    if (words[i] != termWords[j])
                    {
                        termCount = termCount;
                    }
                    else
                    {
                        termCount++;
                    }
                }
                
            }

            double tf = (double)termCount / words.Length;

            return tf;
        }

    }
}
