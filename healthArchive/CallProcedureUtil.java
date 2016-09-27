package healthArchive;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.commons.lang.StringUtils;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.CallableStatementCreator;

/**
 * 调用存储过程用工具类
 * 
 * @author crack
 */
public class CallProcedureUtil {

	/**
	 * 获取调用 jdbcTemplate.execute(CallableStatementCreator csc,
	 * CallableStatementCallback<Object> action)所需要的CallableStatementCreator对象
	 * 
	 * @param procName
	 *            存储过程名字
	 * @param inParam
	 *            Map<String, Object> 入参键值对
	 * @param outParam
	 *            Map<String, Integer>
	 *            出参键值对,Integer从java.sql.Types取值，如Types.VARCHAR对应String
	 * @return CallableStatementCreator
	 */
	public static CallableStatementCreator getCSCreator(String procName, Map<String, Object> inParam,
			Map<String, Integer> outParam) {

		CallableStatementCreator csc = new CallableStatementCreator() {

			@Override
			public CallableStatement createCallableStatement(Connection conn) throws SQLException {

				// 拼接执行存储过程sql
				StringBuffer execSql = new StringBuffer("{call " + procName + " (");
				int paramSize = (inParam == null ? 0 : inParam.size()) + (outParam == null ? 0 : outParam.size());
				for (int i = 0; i < paramSize; i++) {
					execSql.append("?,");
				}
				execSql.deleteCharAt(execSql.length() - 1);
				execSql.append(")}");
				System.out.println(execSql);
				CallableStatement cs = conn.prepareCall(execSql.toString());
				// 设置入参
				if (inParam != null)
					for (Entry<String, Object> entry : inParam.entrySet()) {
						cs.setObject(entry.getKey(), entry.getValue());
					}
				// 设置出参
				if (outParam != null)
					for (Entry<String, Integer> entry : outParam.entrySet()) {
						cs.registerOutParameter(entry.getKey(), entry.getValue());
					}
				return cs;
			}
		};
		return csc;
	}

	/**
	 * 获取调用 jdbcTemplate.execute(CallableStatementCreator csc,
	 * CallableStatementCallback<Object> action)所需要的CallableStatementCallback对象
	 * 
	 * @param dateFormat
	 *            查询返回数据的时间格式
	 * @return CallableStatementCreator
	 */
	public static CallableStatementCallback<Object> getCSCallback(String dateFormat) {

		CallableStatementCallback<Object> action = new CallableStatementCallback<Object>() {

			@Override
			public List<Map<Object, Object>> doInCallableStatement(CallableStatement cs)
					throws SQLException, DataAccessException {

				cs.execute();
				List<Map<Object, Object>> resultsMap = new ArrayList<Map<Object, Object>>();
				ResultSet rs = (ResultSet) cs.executeQuery();
				while (rs.next()) {
					// 结果集转换
					Map<Object, Object> rowMap = new HashMap<Object, Object>();
					int totalColumn = rs.getMetaData().getColumnCount();
					for (int i = 1; i <= totalColumn; i++) {
						String tmp = rs.getMetaData().getColumnLabel(i);
						String type = rs.getMetaData().getColumnTypeName(i);
						if (StringUtils.equalsIgnoreCase("datetime", type)) {
							Date date = rs.getDate(tmp);
							if (null == date) {
								rowMap.put(tmp, "");
							} else {
								SimpleDateFormat df = new SimpleDateFormat(dateFormat);
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
		};
		return action;
	}
}
