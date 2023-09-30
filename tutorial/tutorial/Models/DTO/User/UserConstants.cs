namespace tutorial.Models.DTO.User
{
    public class UserConstants
    {
        public static List<UserDto> Users = new List<UserDto>()
        {
            new UserDto()
            {
                UserName = "test",
                Password = "test",
                Phone = "test",
                Email = "test",
                SurName = "test",
                GivenName = "test",
                Role = "admin"
            },
            new UserDto()
            {
                UserName = "test1",
                Password = "test1",
                Phone = "test1",
                Email = "test1",
                SurName = "test1",
                GivenName = "test1",
                Role = "user"
            },
        };
    }
}
