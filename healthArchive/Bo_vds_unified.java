package healthArchive;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import medicalPHR.dto.WebResponse;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.PropertyFilter;

import org.apache.commons.lang.StringUtils;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.CallableStatementCreator;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import ba.base.BoBase;

public class Bo_vds_unified extends BoBase {

	public JdbcTemplate jdbcTemplate;

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	/**
	 * {"din":{"where":"1=1","page":1,"rows":10}} 获取个人档案列表
	 */
	@SuppressWarnings({ "unchecked", "static-access", "rawtypes" })
	public JSONObject getPdList(JSONObject dataIn) {

		VdsResponse vdsResponse = new VdsResponse();
		JSONObject dinObj = null;
		Integer page = null;
		Integer rows = null;
		
		try {
			dinObj = (JSONObject) dataIn.get("din");
			page = (Integer) dinObj.get("page");
			rows = (Integer) dinObj.get("rows");
			if (page == null || rows == null) throw new Exception();
		} catch (Exception e) {
			vdsResponse.getStatus().setResultCode(-99);
			vdsResponse.getStatus().setResultMsg("执行失败：传入参数格式有误");
			e.printStackTrace();
		}

		List resultsMap = null;
		try {
			resultsMap = (List) jdbcTemplate.execute(
					new CallableStatementCreator() {
						@Override
						public CallableStatement createCallableStatement(
								Connection con) throws SQLException {
							String proc = "{call procJBZLSelect(?, ?)}";// 调用存储过程的sql语句 预编译
							CallableStatement cs = con.prepareCall(proc);// 调用存储过程
							 cs.setInt("pageNo", 1);// 设置输入参数的值 
							 cs.setInt("pageSize", 10);
							// cs.registerOutParameter("output", Types.VARCHAR);//
							// 注册输出参数的类型
							return cs;
						}
					}, new CallableStatementCallback<Object>() {
						@Override
						public Object doInCallableStatement(CallableStatement cs)
								throws SQLException, DataAccessException {
							cs.execute();
							List resultsMap = new ArrayList();
							ResultSet rs = (ResultSet) cs.executeQuery();// 获取游标一行的值
							while (rs.next()) {// 转换每行的返回值到Map中
								Map rowMap = new HashMap();
								
//							rowMap.put("grbh", rs.getString("grbh"));
//							rowMap.put("grda_xm", rs.getString("grda_xm"));
//							resultsMap.add(rowMap);
								
								//自定义逻辑
								int totalColumn = rs.getMetaData().getColumnCount();
								for (int i = 1; i <= totalColumn; i++) {
									String tmp = rs.getMetaData().getColumnLabel(i);
									String type = rs.getMetaData().getColumnTypeName(i);
									if (StringUtils.equalsIgnoreCase("datetime", type)) {
										Date date = rs.getDate(tmp);
										if (null == date) {
											rowMap.put(tmp, "");// 格式转换
										} else {
											SimpleDateFormat df = new SimpleDateFormat(
													"yyyy-MM-dd");
											rowMap.put(tmp, df.format(date));
										}
									} else {
										rowMap.put(tmp, rs.getString(tmp));
									}
								}
								resultsMap.add(rowMap);
							}
							rs.close();
							return resultsMap;
						}
					});
		} catch (DataAccessException e) {
			vdsResponse.getStatus().setResultCode(-99);
			vdsResponse.getStatus().setResultMsg("执行失败：" + e.getMessage());
			e.printStackTrace();
		}
		vdsResponse.setDout(resultsMap);
		vdsResponse.setTotal(resultsMap.size());
		
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setJsonPropertyFilter(new PropertyFilter() {
			
			@Override
			public boolean apply(Object source, String name, Object value) {
				return value == null ? true : false;
			}
		});
		JSONObject dataOut = new JSONObject().fromObject(vdsResponse, jsonConfig);
		return dataOut;
	}

	/**
	 * 保存檔案信息
	 * 
	 * @request http://localhost:8080/vds5s1/ba/boCallMethodPC.jsp?data=
	 * @param jDataIn
	 *            :{"din":{"data":"1=1"},"boName":"saveArchiveData","funcName":
	 *            "boVdsUnified"}
	 * @return response
	 * @throws Exception
	 */
	@SuppressWarnings("static-access")
	@Transactional(propagation = Propagation.REQUIRED)
	public JSONObject saveArchiveData(JSONObject jDataIn) throws Exception {

		String tableName = "phr_grda_jbzl";
		JSONObject jsonObject = new JSONObject();
		VdsResponse vdsResponse = null;
		try {
			String sql = insertData(tableName, (JSONObject)jDataIn.get("din"));
			System.out.println(sql);
			jdbcTemplate.execute(sql);
			vdsResponse = new VdsResponse();
		} catch (Exception e) {
			vdsResponse = new VdsResponse(1, e.getMessage());
			e.printStackTrace();
			throw new Exception(e);
		}
		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setJsonPropertyFilter(new PropertyFilter() {
			
			@Override
			public boolean apply(Object source, String name, Object value) {
				return value == null ? true : false;
			}
		});
		return jsonObject.fromObject(vdsResponse, jsonConfig);
	}
	
	

	public String insertData(String tableName, JSONObject jDataIn) {
		String insertStr = null;
		try {
			// 组成insert sql
			StringBuffer query = new StringBuffer("insert into " + tableName
					+ " (");
			StringBuffer values = new StringBuffer();
			Iterator it = jDataIn.entrySet().iterator();
			while (it.hasNext()) {
				Map.Entry m = (Map.Entry) it.next();
				String columName = (String) m.getKey();
				query.append(columName);
				query.append(",");

				String columValue = (String) m.getValue();
				
				values.append("'");
				values.append(columValue);
				values.append("'");
				values.append(",");
			}

			query.deleteCharAt(query.length() - 1);
			query.append(") values(");
			query.append(values);
			query.deleteCharAt(query.length() - 1);
			query.append(")");
			insertStr = query.toString();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return insertStr;
	}

	public String updateData(String tablename, JSONObject jDataIn, String id) {
		// update vds_table2 set strCol='mqx',intCol=1,dataCol='2009-09-18
		// 14:40:31' where strCol='mqx'
		StringBuffer query = new StringBuffer("update " + tablename + " set ");
		Iterator it = jDataIn.entrySet().iterator();
		while (it.hasNext()) {
			Map.Entry m = (Map.Entry) it.next();
			// m.getKey(),m.getValue()
			query.append(m.getKey());
			query.append("=");

			String columValue = (String) m.getValue();

			query.append(columValue);
			query.append(",");
		}
		query.deleteCharAt(query.length() - 1);
		query.append(" where id='");
		query.append(id);
		query.append("'");
		String updateStr = query.toString();
		return updateStr;
	}

	public static void main(String[] args) {

		WebResponse status = new WebResponse(-99, "adfadsf");
		JSONObject jsonObject = new JSONObject();
		jsonObject = jsonObject.fromObject(status);
		System.out.println(jsonObject);
	}
}
