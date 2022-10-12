using System;
using System.Globalization;

namespace WebApplication1.Extensions
{
    public static class DateTimeTools
    {
        public enum ShowMode
        {
            OnlyDateAndTime,
        }

        public static string GeorgianToPersian(this DateTime dateTime, ShowMode? showMode=null)
        {
            PersianCalendar p = new PersianCalendar();
            int year = p.GetYear(dateTime);
            int month = p.GetMonth(dateTime);
            int day = p.GetDayOfMonth(dateTime);
            
            switch (showMode)
            {
                case ShowMode.OnlyDateAndTime:
                    int hour = p.GetHour(dateTime);
                    int minute = p.GetMinute(dateTime);
                    return
                        $"{year.ToString()}" +
                        $"/{month.ToString().PadLeft(2, '0')}/" +
                        $"{day.ToString().PadLeft(2, '0')} " +
                        $"{minute.ToString().PadLeft(2, '0')} : " +
                        $"{hour.ToString().PadLeft(2, '0')} "
                        ;
                default:
                    return $"{day.ToString().PadLeft(2, '0')} / {month.ToString().PadLeft(2, '0')} / {year.ToString()}";
            }
        }

        public static DateTime? ParsePersianToGorgian(this string date)
        {
            if (!String.IsNullOrEmpty(date) && !String.IsNullOrEmpty(date.Trim()) && (date.Trim() != "----/--/--" || date.Trim() != "--/--/----"))
            {
                try
                {
                    PersianCalendar p = new PersianCalendar();
                    string[] split = date.Split(new char[] { '/', '-' });
                    if (Int32.Parse(split[0]) > 31)
                    {
                        int year = Int32.Parse(split[0]);
                        int month = Int32.Parse(split[1]);
                        int day = Int32.Parse(split[2]);
                        return (p.ToDateTime(year, month, day, 0, 0, 0, 0));
                    }
                    else
                    {
                        int year = Int32.Parse(split[2]);
                        int month = Int32.Parse(split[1]);
                        int day = Int32.Parse(split[0]);
                        return (p.ToDateTime(year, month, day, 0, 0, 0, 0));
                    }
                }
                catch (Exception)
                {
                    return null;
                }
            }
            else
            {
                return null;
            }
        }

    }
}
