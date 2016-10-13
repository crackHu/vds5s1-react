package phrs.login;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceUtils;

import ba.base.BoBase;

import com.ba.init.VdsResponse;

import net.sf.json.JSONObject;

public class Bo_Vds_Login extends BoBase{
	private JdbcTemplate jdbcTemplate;
	
	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}


	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	/**
	 * 执行登录
	 * @param dataIn
	 * @return   1 代表登录成功     2 代表密码有误       3代表账户错误
	 */
	public JSONObject proLogin(JSONObject dataIn){
		
		JSONObject jDataOut = new JSONObject();
		
		JSONObject din = (JSONObject) dataIn.get("din");
		String loginName = (String) din.get("loginName");
		String loginPwd = (String) din.get("loginPwd");
		
		String msg = "";
		CallableStatement call = null;
		ResultSet result = null;
		
		VdsResponse response = new VdsResponse();
		try {
			Connection conn = DataSourceUtils.getConnection(jdbcTemplate.getDataSource());
			
			call = conn.prepareCall("{ call proNameSelect ('"+loginName+"') }");
			//call = conn.prepareCall("{ call proLoginSelect ("+loginName+" , "+loginPassword+") }");
			result = call.executeQuery();
			
			if(result.next()){
				
				call = conn.prepareCall("{ call proLoginSelect ('"+loginName+"' , '"+loginPwd+"' ) }");
				result = call.executeQuery();
				
				if(result.next()){
					response.getDout().getStatus().setResultCode(0);
					response.getDout().getStatus().setResultMsg(" 登录成功！ ");
				}else{
					response.getDout().getStatus().setResultCode(-1);
					response.getDout().getStatus().setResultMsg(" 密码错误！ ");
				}
			}else{
				response.getDout().getStatus().setResultCode(-2);
				response.getDout().getStatus().setResultMsg(" 账户错误！ ");
			}	
			
			String jsons = response.toString(response);
			jDataOut = JSONObject.fromObject(jsons);
			
		} catch (Exception e) {
			// TODO: handle exception
			msg = e.getMessage();
			jDataOut.put("resultCode", -99);
			jDataOut.put("resultMsg", null);
			jDataOut.put("fail", msg);
		}
		return jDataOut;
	}
	
}
