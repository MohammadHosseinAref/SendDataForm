using System.Threading.Tasks;
using WebApplication1.ViewModels;

namespace WebApplication1.Services.Interface
{
    public interface IInfoService
    {
        bool Add(InfoVM infoVM);
        Task<bool> AddSp(InfoVM infoVM);
    }
}
