package healthArchive;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import net.sf.json.JSONArray;
import net.sf.json.JSONException;
import net.sf.json.JSONObject;

@SuppressWarnings("static-access")
public class VdsResponse implements Serializable {

	public class Status implements Serializable {
		int resultCode;
		String resultMsg;

		public Status(int resultCode, String resultMsg) {
			this.resultCode = resultCode;
			this.resultMsg = resultMsg;
		}

		public int getResultCode() {
			return resultCode;
		}

		public String getResultMsg() {
			return resultMsg;
		}

		public void setResultCode(int resultCode) {
			this.resultCode = resultCode;
		}

		public void setResultMsg(String resultMsg) {
			this.resultMsg = resultMsg;
		}

		public void jsonStringToHeader(JSONObject json) {
			try {
				Integer result_code = (Integer) json.get("resultCode");
				this.resultCode = result_code != null ? -1 : result_code;
			} catch (JSONException e) {
				e.printStackTrace();
			}
		}
	}

	Integer total;

	Status status;

	List<Object> dout;

	public VdsResponse() {
		status = new Status(1, "执行成功");
	}

	public VdsResponse(int resultCode, String resultMsg) {
		status = new Status(resultCode, resultMsg);
	}

	public VdsResponse(String jsonStr) {
		try {
			new VdsResponse();
			JSONObject json = new JSONObject().fromObject(jsonStr);
			JSONObject doutJson = json.getJSONObject("dout");
			status.jsonStringToHeader(doutJson.getJSONObject("status"));
		} catch (JSONException e) {
			e.printStackTrace();
		}
	}

	public List<Object> getDout() {
		return dout;
	}

	public Status getStatus() {
		return status;
	}

	public Integer getTotal() {
		return total;
	}

	public void setDout(List<Object> dout) {
		this.dout = dout;
	}

	public void setStatus(Status status) {
		this.status = status;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public String toString(VdsResponse ep) {
		return JSONObject.fromObject(ep).getJSONObject("dout").toString();
	}
}
