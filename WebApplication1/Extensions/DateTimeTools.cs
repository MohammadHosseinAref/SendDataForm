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
                    return $"{year.ToString()} / {month.ToString().PadLeft(2, '0')} / {day.ToString().PadLeft(2, '0')}";
            }
        }

    }
}
