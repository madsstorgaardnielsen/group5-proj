using Newtonsoft.Json;

namespace fbcmanager_api.Models;

public class Error {
    public int StatusCode { get; set; }
    public string Message { get; set; }
    public override string ToString() => JsonConvert.SerializeObject(this);
}