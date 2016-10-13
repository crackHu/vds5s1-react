package phrs.phr;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.persistence.criteria.CriteriaBuilder.In;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.ba.init.VdsResponse;
import com.mysql.jdbc.StringUtils;
import com.sun.org.apache.regexp.internal.recompile;

import ba.base.BoBase;
import ba.util.Log4jUtil;
import ba.util.JsonData;

/**
 * 个人档案 基础资料 、 既往史、家族史
 * 
 * @author Nothingexp
 * 
 */

public class Bo_Vds_BoPersonDoc extends BoBase {

	private JdbcTemplate jdbcTemplate;
	private JsonData jsonDate = new JsonData();
	private Log4jUtil log4 = new Log4jUtil();

	public JdbcTemplate getJdbcTemplate() {
		return jdbcTemplate;
	}

	public void setJdbcTemplate(JdbcTemplate jdbcTemplate) {
		this.jdbcTemplate = jdbcTemplate;
	}

	/**
	 * 获取个人档案列表 基础资料
	 * 
	 * @param dataIn
	 * @return jDataOut
	 * @throws Exception
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public JSONObject pdSaveData(JSONObject dataIn) {
		 
		JSONObject jDataOut = new JSONObject();

		JSONObject obj = (JSONObject) dataIn.get("din");
		// String phone = (String) obj.get("phone");
		int page = (Integer) obj.get("page");
		int rows = (Integer) obj.get("rows");

		if (page <= 0) {
			page = 1;
		}

		String msg = "";
		String type = "";
		String temp = "";
		int total = 0;
		List<Object> pdSaveDataList = new ArrayList<Object>();

		// 返回前台
		VdsResponse response = new VdsResponse();
		response.getDout().getStatus().setResultCode(1);
		response.getDout().getStatus().setResultMsg("ok");
		try {
			Connection conn = DataSourceUtils.getConnection(jdbcTemplate
					.getDataSource());
			CallableStatement call = conn
					.prepareCall(" { call proGrdaLbSelect(" + page + " , "
							+ rows + ") } ");
			log4.log.info(" -=-=-=-=-=-=-=-=-=-=-=-=-= call -=-=-=-=-=-=-=-=-:    "
					+ call);
			ResultSet result = call.executeQuery();

			while (result.next()) {
				total = result.getMetaData().getColumnCount();
				JSONObject json = new JSONObject();
				for (int i = 1; i <= total; i++) {
					type = result.getMetaData().getColumnTypeName(i);
					temp = result.getMetaData().getColumnLabel(i);

					if ("DATETIME".equals(type)) {
						Date date = result.getDate(temp);
						if (null == date) {
							json.put(temp, ""); // 格式转换
						} else {
							SimpleDateFormat s = new SimpleDateFormat(
									"yyyy-MM-dd");
							json.put(temp, s.format(result.getDate(temp)));
							// String time = s.format(result.getDate(temp));
							// System.out.println("                " + time);
						}
					} else {
						json.put(temp, result.getString(temp));
					}
				}
				pdSaveDataList.add(json);
			}
			// response.getDout().setTotal(rows);
		} catch (Exception e) {
			// TODO: handle exception
			msg = e.getMessage();
			response.getDout().getStatus().setResultCode(-99);
			response.getDout().getStatus().setResultMsg(msg);
			e.printStackTrace();
		}

		// 拿取返回结果
		String jsons = response.toString(response);
		jDataOut = JSONObject.fromObject(jsons);
		// JSONObject d = JSONObject.fromObject(jsons);
		jDataOut.put("total", rows);
		jDataOut.put("dout", pdSaveDataList);
		// jDataOut.put("states", jsons);

		// 加入足迹到数据库
		// addProcess(jdbcTemplate, actionTitle, phone, null, process, null);
		return jDataOut;
	}

	/**
	 * 根据 个人编号（id） 获取某个个人档案资料 (包括全部的表)
	 * 
	 * @param dataIn
	 * @return jDataOut
	 * @throws Exception
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public JSONObject getDataById(JSONObject dataIn) {
		JSONObject jDataOut = new JSONObject();

		JSONObject din = (JSONObject) dataIn.get("din");
		String jbzlId = (String) din.get("id");

		String msg = "";
		String grbh = "";
		String temp = "";
		String type = "";
		String grda_tjrq = "";
		String xh = "";
		ResultSet result = null;
		long start = 0;
		long end = 0;

		JSONObject json = new JSONObject();

		// 返回前台
		VdsResponse response = new VdsResponse();
		response.getDout().getStatus().setResultCode(1);
		response.getDout().getStatus().setResultMsg("ok");

		try {

			// 开启连接
			Connection conn = DataSourceUtils.getConnection(jdbcTemplate
					.getDataSource());

			// 判断改 grbh 是否存在,不存在则不执行后面的操作
			// 访问数据库对应的函数
			start = System.currentTimeMillis();
			grbh = "88888888";
			/*
			 * String sql =
			 * "SELECT  * from phr_grda_jbzl where ifnull(zfbj,0)= 0 and grbh =  '"
			 * +grbh+"'"; SqlRowSet rs = jdbcTemplate.queryForRowSet(sql);
			 */
			CallableStatement call = conn
					.prepareCall("{ call proGrdaGrbhSelect (\"'" + jbzlId
							+ "'\") }");
			result = call.executeQuery();
			end = System.currentTimeMillis();

			System.out.println(" 第零个： " + (end - start));
			// CallableStatement call = null;

			if (result.next()) {

				 grbh = result.getString("grbh");
				//grbh = "88888888";
				// 查询得到，证明是存在该 个人编号
				// 查询 个人档案-基本资料
				start = System.currentTimeMillis();
				call = conn.prepareCall("{ call proGrdaJbzlSelect (\"'" + grbh
						+ "'\") }");
				// json.put("grdaJbzl", jsonDate.queryForIf(call));
				result = call.executeQuery();
				if (result.next()) {
					int total = result.getMetaData().getColumnCount();
					JSONObject jsonJbzl = new JSONObject();
					for (int i = 1; i <= total; i++) {
						temp = result.getMetaData().getColumnLabel(i);
						type = result.getMetaData().getColumnTypeName(i);

						if ("DATETIME".equals(type)) {
							Date date = result.getDate(temp);
							if (null == date) {
								jsonJbzl.put(temp, "");
							} else {
								SimpleDateFormat s = new SimpleDateFormat(
										"yyyy-MM-dd");
								jsonJbzl.put(temp,
										s.format(result.getDate(temp)));
							}
						} else {
							jsonJbzl.put(temp, result.getString(temp));
						}
					}
					json.put("grdaJbzl", jsonJbzl);
				}
				// jbzlList = jsonDate.queryForIf(call);
				end = System.currentTimeMillis();

				System.out.println(" 第一个： " + (end - start));
				// 查询完毕 个人档案-基本资料 ，查询 个人档案-既往史

				start = System.currentTimeMillis();
				call = conn.prepareCall("{ call proGrdaJwsSelect (\"'" + grbh
						+ "'\") }");
				List<Object> jwsList = jsonDate.queryForWhile(call);
				json.put("grdaJws", jwsList);
				// response.getDout().setOneTotal(jwsList.size());
				// jwsSum = (Integer) jwsList.remove(1);
				// jbzlList.add(jwsList);
				end = System.currentTimeMillis();

				System.out.println(" 第二个： " + (end - start));
				// 查询完毕 个人档案-基本资料 ，查询 个人档案-家族史
				start = System.currentTimeMillis();
				call = conn.prepareCall("{ call proGrdaJzsSelect (" + grbh
						+ ") }");
				List<Object> jzsList = jsonDate.queryForWhile(call);
				json.put("grdaJzs", jzsList);
				// response.getDout().setTwoTotal(jzsList.size());
				// jzsSum = (Integer) jzsList.remove(1);
				// jbzlList.add(jsonDate.queryForWhile(call));
				end = System.currentTimeMillis();

				System.out.println(" 第三个： " + (end - start));
				// 查询健康档案
				start = System.currentTimeMillis();
				call = conn.prepareCall("{ call proGrdaJkdaSelect(\"'" + grbh
						+ "'\") }");
				result = call.executeQuery();
				List<Object> jkdaList = new ArrayList<Object>();
				while (result.next()) {

					int total = result.getMetaData().getColumnCount();
					JSONObject jsonJkda = new JSONObject();
					for (int i = 1; i <= total; i++) {
						temp = result.getMetaData().getColumnLabel(i);
						type = result.getMetaData().getColumnTypeName(i);

						if ("DATETIME".equals(type)) {
							Date date = result.getDate(temp);
							if (null == date) {
								jsonJkda.put(temp, "");
							} else {
								SimpleDateFormat s = new SimpleDateFormat(
										"yyyy-MM-dd");
								jsonJkda.put(temp,
										s.format(result.getDate(temp)));
							}
						} else {
							jsonJkda.put(temp, result.getString(temp));
						}
					}
					// jkdaList.add(jsonJkda);
					// System.out.println("list" + jkdaList);

					// 添加对应的 健康状况记录_住院治疗情况
					grda_tjrq = result.getString("grda_tjrq");
					grda_tjrq = grda_tjrq.substring(0, grda_tjrq.indexOf(" "));

					end = System.currentTimeMillis();

					System.out.println(" 第四个： " + (end - start));
					JSONObject jsonZyzlqk = new JSONObject();
					start = System.currentTimeMillis();
					call = conn
							.prepareCall("{ call  proGrdaJkdaByTimeSelect( 'phr_grda_jkzk_zyzlqk' , \"'"
									+ grbh
									+ "'\" , \"'"
									+ grda_tjrq
									+ "'\"  )  }");
					// jsonZyzlqk.put("grdaZyzlqk",
					// jsonDate.queryForWhile(call));
					jsonJkda.put("grdaZyzlqk", jsonDate.queryForWhile(call));
					// jkdaList.add(jsonZyzlqk);
					end = System.currentTimeMillis();

					System.out.println(" 第五个： " + (end - start));
					// 添加对应的 健康状况记录_主要用药情况
					JSONObject jsonZyyyqk = new JSONObject();
					start = System.currentTimeMillis();
					call = conn
							.prepareCall("{ call  proGrdaJkdaByTimeSelect( 'phr_grda_jkzk_zyyyqk' , \"'"
									+ grbh
									+ "'\" , \"'"
									+ grda_tjrq
									+ "'\"  )  }");
					jsonJkda.put("grdaZyyyqk", jsonDate.queryForWhile(call));
					// jsonZyyyqk.put("grdaZyyyqk",
					// jsonDate.queryForWhile(call));
					// jkdaList.add(jsonZyyyqk);
					end = System.currentTimeMillis();

					System.out.println(" 第六个： " + (end - start));
					// 添加对应的 健康状况记录_非免疫规划预防接种史
					JSONObject jsonFmyjzs = new JSONObject();
					start = System.currentTimeMillis();
					call = conn
							.prepareCall("{ call  proGrdaJkdaByTimeSelect( 'phr_grda_jkzk_fmyjzs' , \"'"
									+ grbh
									+ "'\" , \"'"
									+ grda_tjrq
									+ "'\"  )  }");
					jsonJkda.put("grdaFmyjzs", jsonDate.queryForWhile(call));
					// jsonFmyjzs.put("grdaFmyjzs",
					// jsonDate.queryForWhile(call));
					// jkdaList.add(jsonFmyjzs);
					end = System.currentTimeMillis();

					System.out.println(" 第七个： " + (end - start));
					// 添加对应的 健康状况记录_异常情况
					JSONObject jsonWtml = new JSONObject();
					start = System.currentTimeMillis();
					call = conn
							.prepareCall("{ call  proGrdaJkdaByTimeSelect( 'phr_grda_wtml' , \"'"
									+ grbh
									+ "'\" , \"'"
									+ grda_tjrq
									+ "'\"  )  }");
					jsonJkda.put("phr_grda_wtml", jsonDate.queryForWhile(call));
					// jsonWtml.put("phr_grda_wtml",
					// jsonDate.queryForWhile(call));
					// jkdaList.add(jsonWtml);
					jkdaList.add(jsonJkda);
				}
				json.put("grdaJkda", jkdaList);
				end = System.currentTimeMillis();

				System.out.println(" 第八个： " + (end - start));
				// 查询 高血压
				start = System.currentTimeMillis();
				call = conn.prepareCall("{ call proGrdaGxySelect( " + grbh
						+ ")  }");
				result = call.executeQuery();
				List<Object> gxyList = new ArrayList<Object>();
				while (result.next()) {
					int total = result.getMetaData().getColumnCount();
					JSONObject jsonGxy = new JSONObject();
					for (int i = 1; i <= total; i++) {
						temp = result.getMetaData().getColumnLabel(i);
						type = result.getMetaData().getColumnTypeName(i);

						if ("DATETIME".equals(type)) {
							Date date = result.getDate(temp);
							if (null == date) {
								jsonGxy.put(temp, "");
							} else {
								SimpleDateFormat s = new SimpleDateFormat(
										"yyyy-MM-dd");
								jsonGxy.put(temp,
										s.format(result.getDate(temp)));
							}
						} else {
							jsonGxy.put(temp, result.getString(temp));
						}
					}
					end = System.currentTimeMillis();

					System.out.println(" 第九个： " + (end - start));
					xh = result.getString("xh");
					// 添加对应的 高血压_随访表_用药情况
					start = System.currentTimeMillis();
					call = conn
							.prepareCall("{ call proGrdaGxyByTimeSelect( 'phr_jbzd_gxy_sfb2_yyqk' , \"'"
									+ grbh + "'\" , \"'" + xh + "'\" ) }");
					jsonGxy.put("gxyYyqk", jsonDate.queryForWhile(call));

					gxyList.add(jsonGxy);
				}
				json.put("gxyJxb", gxyList);
				end = System.currentTimeMillis();

				System.out.println(" 第十个： " + (end - start));
				// 查询 糖尿病
				start = System.currentTimeMillis();
				call = conn.prepareCall("{ call proGrdaTnbSelect( \"'" + grbh
						+ "'\")  }");
				result = call.executeQuery();
				List<Object> tnbList = new ArrayList<Object>();
				while (result.next()) {
					int total = result.getMetaData().getColumnCount();
					JSONObject jsonTnb = new JSONObject();
					for (int i = 1; i <= total; i++) {
						temp = result.getMetaData().getColumnLabel(i);
						type = result.getMetaData().getColumnTypeName(i);

						if ("DATETIME".equals(type)) {
							Date date = result.getDate(temp);
							if (null == date) {
								jsonTnb.put(temp, "");
							} else {
								SimpleDateFormat s = new SimpleDateFormat(
										"yyyy-MM-dd");
								jsonTnb.put(temp,
										s.format(result.getDate(temp)));
							}
						} else {
							jsonTnb.put(temp, result.getString(temp));
						}
					}
					end = System.currentTimeMillis();

					System.out.println(" 第十一个： " + (end - start));
					xh = result.getString("xh");
					// 添加对应的 高血压_随访表_用药情况
					start = System.currentTimeMillis();
					call = conn
							.prepareCall("{ call proGrdaTnbByTimeSelect( 'phr_jbzd_gxy_sfb2_yyqk' , \"'"
									+ grbh + "'\" , \"'" + xh + "'\" ) }");
					jsonTnb.put("tnbYyqk", jsonDate.queryForWhile(call));

					tnbList.add(jsonTnb);
				}
				json.put("tnbSfjl", gxyList);
				end = System.currentTimeMillis();

				System.out.println(" 第十二个： " + (end - start));
				// 查询 老年人
				start = System.currentTimeMillis();
				call = conn.prepareCall("{call proGrdaLnrSelect( \"'" + grbh
						+ "'\") }");
				json.put("lnrSfb", jsonDate.queryForWhile(call));
				end = System.currentTimeMillis();

				System.out.println(" 第十三个： " + (end - start));
			}
		} catch (Exception e) {
			// TODO: handle exception
			msg = e.getMessage();
			response.getDout().getStatus().setResultCode(-99);
			response.getDout().getStatus().setResultMsg(msg);
			e.printStackTrace();
		}

		// 拿取返回结果
		String jsons = response.toString(response);
		jDataOut = JSONObject.fromObject(jsons);
		// JSONObject d = JSONObject.fromObject(jsons);

		jDataOut.put("dout", json);

		return jDataOut;
	}

	/**
	 * 获取个人档案 根据 grbh：个人编号 grda_xm：姓名 grda_xb：性别 grda_csrq：出生日期 grda_sfzhm：身份证号码
	 * grda_hkdz_jdzmc：户口地址_街道(镇)名称 grda_hkdz_jwcmc：户口地址_居委(村)名称
	 * grda_hkdz_ljmc：户口地址_路_街_名称 grda_hklx：户口类型 grda_brdh：本人电话 grda_jtdh：家庭电话
	 * 查询（ 可选其中的一或多个查询 ）
	 * 
	 * @param dataIn
	 * @return jDataOut
	 * @throws Exception
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public JSONObject getPdList(JSONObject dataIn) {

		JSONObject jDataOut = new JSONObject();

		JSONObject din = (JSONObject) dataIn.get("din");
		int page = (Integer) din.get("page");
		int rows = (Integer) din.get("rows");
		String condition = (String) din.get("condition");

		if (page <= 0) {
			page = 1;
		}

		String msg = "";
		String type = "";
		String temp = "";
		int total = 0;
		List<Object> pdSaveDataList = new ArrayList<Object>();

		// 返回前台
		VdsResponse response = new VdsResponse();
		response.getDout().getStatus().setResultCode(1);
		response.getDout().getStatus().setResultMsg("ok");
		try {
			Connection conn = DataSourceUtils.getConnection(jdbcTemplate
					.getDataSource());
			CallableStatement call = conn
					.prepareCall(" { call proGrdaLbByConditionSelect(\" "
							+ condition + " \" ," + page + " , " + rows
							+ ") } ");
			log4.log.info(" -=-=-=-=-=-=-=-=-=-=-=-=-= call -=-=-=-=-=-=-=-=-:    "
					+ call);
			ResultSet result = call.executeQuery();

			while (result.next()) {
				total = result.getMetaData().getColumnCount();
				JSONObject json = new JSONObject();
				for (int i = 1; i <= total; i++) {
					type = result.getMetaData().getColumnTypeName(i);
					temp = result.getMetaData().getColumnLabel(i);

					if ("DATETIME".equals(type)) {
						Date date = result.getDate(temp);
						if (null == date) {
							json.put(temp, ""); // 格式转换
						} else {
							SimpleDateFormat s = new SimpleDateFormat(
									"yyyy-MM-dd");
							json.put(temp, s.format(result.getDate(temp)));
						}
					} else {
						json.put(temp, result.getString(temp));
					}
				}
				pdSaveDataList.add(json);
			}

			response.getDout().getStatus().setResultCode(1);
			response.getDout().getStatus().setResultMsg("ok");
		} catch (Exception e) {
			// TODO: handle exception
			msg = e.getMessage();
			response.getDout().getStatus().setResultCode(-99);
			response.getDout().getStatus().setResultMsg(msg);
			e.printStackTrace();
		}

		// 拿取返回结果
		String jsons = response.toString(response);
		jDataOut = JSONObject.fromObject(jsons);
		// JSONObject d = JSONObject.fromObject(jsons);
		jDataOut.put("dout", pdSaveDataList);
		// jDataOut.put("states", jsons);
		return jDataOut;
	}

	/**
	 * 个人档案保存 （ 包括 家族史 、 基础资料 、 既往史 ） resultCode : 1: 全部插入成功 -100001 ： 前台传入数据数据
	 * id 有误 -100002：基础资料 保存 失败 -100003 :基础资料 保存 失败 -100004 ： 家族史 保存 失败
	 * 
	 * @param dataIn
	 * @return jDataOut
	 * @throws Exception
	 *             SQLException
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public JSONObject savePdData(JSONObject dataIn) throws SQLException {
		JSONObject jDataOut = new JSONObject();

		JSONObject din = (JSONObject) dataIn.get("din");

		JSONObject jsonJbzl = (JSONObject) din.get("grdaJbzl");
		JSONArray jsonJws = (JSONArray) din.get("grdaJws");
		JSONArray jsonJzs = (JSONArray) din.get("grdaJzs");

		String msg = "";
		String sql = "";
		String grbh = "";
		String jbzlId = "";
		int i = 0;

		Connection conn = DataSourceUtils.getConnection(jdbcTemplate
				.getDataSource());
		boolean flag = false;

		VdsResponse response = new VdsResponse();
		// 返回前台
		response.getDout().getStatus().setResultCode(1);
		response.getDout().getStatus().setResultMsg("保存成功！");
		try {

			if (null != jsonJbzl) {
				jbzlId = (String) jsonJbzl.get("id");
				System.out.println("　　id==null　" + (null == jbzlId) + "      "
						+ ("".equals(jbzlId)) + "   1" + jbzlId + "2");
				// org.apache.commons.lang.StringUtils.isNotEmpty(str);
				if (null != jbzlId && !("".equals(jbzlId))) {
					/*
					 * call = conn.prepareCall("{call proGrdaGrIdSelect ( \"'" +
					 * id + "'\" ) }"); result = call.executeQuery();
					 */
					// 该用户已经存在
					response.getDout().getStatus().setResultCode(-100001);
					response.getDout().getStatus()
							.setResultMsg(" 前台传入数据数据 id 有误 ");
				} else {
					// 执行 个人档案 的 基础资料的 插入
					grbh = (String) jsonJbzl.get("grbh");
					if (null != grbh && !("".equals("grbh"))) {
						sql = jsonDate.dealListInsert("phr_grda_jbzl",
								jsonJbzl, grbh);
						log4.log.info(" -=-=-=-=-=- -=-=-=-= savePdData 方法里面  执行的  jsonJbzl sql 为：  -=-=-=-= - -=-=-=-=-="
								+ sql);
						i = jdbcTemplate.update(sql);
						if (i < 0) {
							// 证明插入不成功
							conn.rollback();
							response.getDout().getStatus()
									.setResultCode(-100002);
							response.getDout().getStatus()
									.setResultMsg(" 基础资料  保存  失败   ");
						} else {
							// 插入成功，插入既往史
							if (null != jsonJws) {
								log4.log.info(" -=-=-=-=-=- -=-=-=-= savePdData 方法里面  执行的  jsonJws 的长度  为：  -=-=-=-= - -=-=-=-=-="
										+ jsonJws.size());
								for (int j = 0; j < jsonJws.size(); j++) {
									JSONObject jsonJwsOne = (JSONObject) jsonJws
											.get(j);
									sql = jsonDate.dealListInsert(
											"phr_grda_jws", jsonJwsOne, grbh);
									log4.log.info(" -=-=-=-=-=- -=-=-=-= savePdData 方法里面  执行的  jsonJws sql 为：  -=-=-=-= - -=-=-=-=-="
											+ sql);
									i = jdbcTemplate.update(sql);
									if (i < 0) {
										// 证明插入不成功
										conn.rollback();
										response.getDout().getStatus()
												.setResultCode(-100003);
										response.getDout()
												.getStatus()
												.setResultMsg(" 既往史  保存  失败   ");
										flag = true;
										break;
									}
								}

								if (null != jsonJzs && !flag) {
									// 插入成功 插入家族史
									for (int k = 0; k < jsonJzs.size(); k++) {
										JSONObject jsonJzsOne = (JSONObject) jsonJzs
												.get(k);
										sql = jsonDate.dealListInsert(
												"phr_grda_jzs", jsonJzsOne,
												grbh);
										log4.log.info(" -=-=-=-=-=- -=-=-=-= savePdData 方法里面  执行的  jsonJws sql 为：  -=-=-=-= - -=-=-=-=-="
												+ sql);
										i = jdbcTemplate.update(sql);
										if (i < 0) {
											// 证明插入不成功
											conn.rollback();
											response.getDout().getStatus()
													.setResultCode(-100004);
											response.getDout()
													.getStatus()
													.setResultMsg(
															"  家族史  保存  失败   ");
											flag = true;
											break;
										}
									}
								}
							}
						}
					}
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			conn.rollback();
			msg = e.getMessage();
			response.getDout().getStatus().setResultCode(-99);
			response.getDout().getStatus().setResultMsg(msg);
			e.printStackTrace();
		}

		// 拿取返回结果
		String jsons = response.toString(response);
		jDataOut = JSONObject.fromObject(jsons);
		// JSONObject d = JSONObject.fromObject(jsons);
		jDataOut.put("dout", "");
		return jDataOut;
	}

	/**
	 * 个人档案 更新（ 包括 家族史 、 基础资料 、 既往史 ） resultCode : -100010： 该用户不存在！
	 * -100005：基础资料更新失败 -100006 : 既往史更新失败 -100007 ： 家族史更新失败 -100014 : grdaJbzl
	 * 列表为空 -100008： 删除既往史失败！ -100009： 删除家族史失败！
	 * 
	 * @param dataIn
	 * @return jDataOut
	 * @throws Exception
	 *             SQLException
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public JSONObject updatePdData(JSONObject dataIn) throws SQLException {
		JSONObject jDataOut = new JSONObject();

		JSONObject din = (JSONObject) dataIn.get("din");

		JSONObject jsonJbzl = (JSONObject) din.get("grdaJbzl");
		JSONArray jsonJws = (JSONArray) din.get("grdaJws");
		JSONArray jsonJzs = (JSONArray) din.get("grdaJzs");

		String id = "";
		String msg = "";
		CallableStatement call = null;
		ResultSet result = null;
		String sql = "";
		int i = 0;
		String grbh = "";
		Connection conn = DataSourceUtils.getConnection(jdbcTemplate
				.getDataSource());
		boolean flag = false;

		VdsResponse response = new VdsResponse();
		// 返回前台
		response.getDout().getStatus().setResultCode(1);
		response.getDout().getStatus().setResultMsg(" 更新成功！");
		try {

			id = (String) jsonJbzl.get("id");
			System.out.println("id: " + id + "*");
			call = conn
					.prepareCall("{call proGrdaByIdSelect ( 'phr_grda_jbzl' ,  \"'"
							+ id + "'\" ) }");
			result = call.executeQuery();
			if (result.next()) {
				// 执行 个人档案 的 基础资料的 更新
				String jbzlId = (String) jsonJbzl.get("id");
				grbh = (String) jsonJbzl.get("grbh");

				if (null == grbh) {
					// 代表是删除（前台只传 id ）
					return deletePdGrzlData(id);
				} else {
					// 代表的是更新
					// 执行 个人档案 的 基础资料的 更新
					sql = jsonDate.dealListUpdate("phr_grda_jbzl", jsonJbzl,
							grbh);
					log4.log.info(" -=-=-=-=-=- -=-=-=-= UpdatePdData 方法里面  执行的  jsonJbzl sql 为：  -=-=-=-= - -=-=-=-=-="
							+ sql);
					i = jdbcTemplate.update(sql);
					if (i < 0) {
						// 证明更新不成功
						conn.rollback();
						response.getDout().getStatus().setResultCode(-100005);
						response.getDout().getStatus()
								.setResultMsg(" 基础资料 更新 失败   ");
					} else {
						// 更新成功，更新既往史
						// 先逻辑删除全部的数据，然后插入传进来的全部的数据 zfbj 的 1 代表删除 0 代表 不删除
						sql = "update phr_grda_jws set zfbj = 1 where grbh = ?";

						i = jdbcTemplate.update(sql, grbh);

						if (i < 0) {
							conn.rollback();
							response.getDout().getStatus()
									.setResultCode(-100008);
							response.getDout().getStatus()
									.setResultMsg("删除既往史失败！");
							flag = true;
						} else {
							// 执行插入语句
							if (null != jsonJws) {
								log4.log.info(" -=-=-=-=-=- -=-=-=-= UpdatePdData 方法里面  执行的  jsonJws 的长度  为：  -=-=-=-= - -=-=-=-=-="
										+ jsonJws.size());
								for (int j = 0; j < jsonJws.size(); j++) {
									JSONObject jsonJwsOne = (JSONObject) jsonJws
											.get(j);
									String jwsId = (String) jsonJwsOne
											.get("id");
									sql = jsonDate.dealListInsert(
											"phr_grda_jws", jsonJwsOne, grbh);
									log4.log.info(" -=-=-=-=-=- -=-=-=-= UpdatePdData 方法里面  执行的  jsonJws sql 为：  -=-=-=-= - -=-=-=-=-="
											+ sql);
									i = jdbcTemplate.update(sql);
									if (i < 0) {
										// 证明插入不成功
										conn.rollback();
										response.getDout().getStatus()
												.setResultCode(-100006);
										response.getDout().getStatus()
												.setResultMsg(" 既往史 更新 失败   ");
										flag = true;
										break;
									}
								}
							}

							if (!flag) {
								// 插入成功 插入家族史
								sql = "update phr_grda_jzs set zfbj = 1 where grbh = ?";

								i = jdbcTemplate.update(sql, grbh);

								if (i < 0) {
									conn.rollback();
									response.getDout().getStatus()
											.setResultCode(-100009);
									response.getDout().getStatus()
											.setResultMsg("删除家族史失败！");
									flag = true;
								} else {
									if (null != jsonJzs) {
										for (int k = 0; k < jsonJzs.size(); k++) {
											JSONObject jsonJzsOne = (JSONObject) jsonJzs
													.get(k);
											String jzsId = (String) jsonJzsOne
													.get("id");
											sql = jsonDate.dealListInsert(
													"phr_grda_jzs", jsonJzsOne,
													grbh);
											log4.log.info(" -=-=-=-=-=- -=-=-=-= UpdatePdData 方法里面  执行的  jsonJws sql 为：  -=-=-=-= - -=-=-=-=-="
													+ sql);
											i = jdbcTemplate.update(sql);
											if (i < 0) {
												// 证明插入不成功
												conn.rollback();
												response.getDout().getStatus()
														.setResultCode(-100007);
												response.getDout()
														.getStatus()
														.setResultMsg(
																"  家族史 跟新失败   ");
												break;
											}
										}
									}
								}
							}
						}
					}
				}

			} else {
				response.getDout().getStatus().setResultCode(-100010);
				response.getDout().getStatus().setResultMsg("该用户不存在");
			}
		} catch (Exception e) {
			// TODO: handle exception
			conn.rollback();
			msg = e.getMessage();
			response.getDout().getStatus().setResultCode(-99);
			response.getDout().getStatus().setResultMsg(msg);
			e.printStackTrace();
		}

		// 拿取返回结果
		String jsons = response.toString(response);
		jDataOut = JSONObject.fromObject(jsons);
		// JSONObject d = JSONObject.fromObject(jsons);
		jDataOut.put("dout", "");

		return jDataOut;
	}

	/**
	 * 删除个人档案 ResultCode： -100011 删除个人档案失败！ 1 ： 删除个人档案成功！
	 * 
	 * @throws SQLException
	 */
	private JSONObject deletePdGrzlData(String id) throws SQLException {
		JSONObject jDataOut = new JSONObject();

		String msg = "";
		CallableStatement call = null;
		ResultSet result = null;
		String sql = "";
		int i = 0;

		Connection conn = DataSourceUtils.getConnection(jdbcTemplate
				.getDataSource());
		VdsResponse response = new VdsResponse();
		// 返回前台
		response.getDout().getStatus().setResultCode(1);
		response.getDout().getStatus().setResultMsg("删除成功！");
		try {

			if (null != id && !("".equals(id))) {
				sql = "update phr_grda_jbzl set zfbj = 1 where id = ?";

				i = jdbcTemplate.update(sql, id);

				if (i < 0) {
					response.getDout().getStatus().setResultCode(-100011);
					response.getDout().getStatus().setResultMsg("删除个人档案失败！");
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			conn.rollback();
			msg = e.getMessage();
			response.getDout().getStatus().setResultCode(-99);
			response.getDout().getStatus().setResultMsg(msg);
			e.printStackTrace();
		}

		// 拿取返回结果
		String jsons = response.toString(response);
		jDataOut = JSONObject.fromObject(jsons);
		// JSONObject d = JSONObject.fromObject(jsons);
		jDataOut.put("dout", "");
		return jDataOut;
	}

	/**
	 * 个人档案 保存（ 包括 健康状况记录 、 健康状况记录_住院治疗情况 、 健康状况记录_主要用药情况 、 健康状况记录_非免疫规划预防接种史 、
	 * 健康状况评价表 ）
	 * 
	 * resultCode : 1 : 保存更成功 -100001 ： 前台传入数据数据 id 有误 -100013 ： 健康状况记录 保存 失败
	 * -100014 ： 健康状况记录_住院治疗情况 保存 失败 -100015 ： 健康状况记录_主要用药情况 保存 失败 -100016 :
	 * 健康状况记录_非免疫规划预防接种史 保存 失败 -100017 : 健康状况记录_非免疫规划预防接种史 保存 失败 -100018 : 前台传入的
	 * 主表数据 为空 -100019 : jsonJkzk 列表为空
	 */
	public JSONObject heathSaveData(JSONObject dataIn) throws SQLException {
		JSONObject jDataOut = new JSONObject();

		JSONObject din = (JSONObject) dataIn.get("din");
		JSONObject jsonJkzk = (JSONObject) din.get("grdaJkzk");
		JSONArray jsonZyzlqk = (JSONArray) din.get("grdaZyzlqk");
		JSONArray jsonZyyyqk = (JSONArray) din.get("grdaZyyyqk");
		JSONArray jsonFmyjzs = (JSONArray) din.get("grdaFmyjzs");
		JSONArray jsonWtml = (JSONArray) din.get("grdaWtml");

		String msg = "";
		String sql = "";
		String jkzkId = "";
		String grbh = "";
		boolean flag = false;
		int i = 0;

		Connection conn = DataSourceUtils.getConnection(jdbcTemplate
				.getDataSource());
		VdsResponse response = new VdsResponse();
		response.getDout().getStatus().setResultCode(1);
		response.getDout().getStatus().setResultMsg(" 保存成功！  ");
		try {

			if (null != jsonJkzk) {
				// 获取单个 健康状况记录数据
				jkzkId = (String) jsonJkzk.get("id");

				// 判断 id 是否存在
				if (null != jkzkId && !("".equals(jkzkId))) {
					response.getDout().getStatus().setResultCode(-100001);
					response.getDout().getStatus()
							.setResultMsg("前台传入数据数据 id 有误");
				} else {
					// 插入 健康状况记录数据
					grbh = (String) jsonJkzk.get("grbh");
					if (null != grbh && !("".equals(grbh))) {
						sql = jsonDate.dealListInsert("phr_grda_jkzk",
								jsonJkzk, grbh);
						log4.log.info(" -=-=-=-=-=- -=-=-=-= savePdData 方法里面  执行的  jsonJkzk sql 为：  -=-=-=-= - -=-=-=-=-="
								+ sql);
						i = jdbcTemplate.update(sql);
						if (i < 0) {
							conn.rollback();
							response.getDout().getStatus()
									.setResultCode(-100013);
							response.getDout().getStatus()
									.setResultMsg(" 健康状况记录 保存 失败   ");
							flag = true;
						}

						// 只有健康状况记录表 插入成功 才能插入其他表的
						if (!flag) {
							// 执行插入 健康状况记录_住院治疗情况 表
							flag = false;
							if (null != jsonZyzlqk) {
								for (int j = 0; j < jsonZyzlqk.size(); j++) {
									JSONObject zyzlqk = (JSONObject) jsonZyzlqk
											.get(j);

									sql = jsonDate.dealListInsert(
											"phr_grda_jkzk_zyzlqk", zyzlqk,
											grbh);
									log4.log.info(" -=-=-=-=-=- -=-=-=-= savePdData 方法里面  执行的  zyzlqk sql 为：  -=-=-=-= - -=-=-=-=-="
											+ sql);
									i = jdbcTemplate.update(sql);

									if (i < 0) {
										conn.rollback();
										response.getDout().getStatus()
												.setResultCode(-100014);
										response.getDout()
												.getStatus()
												.setResultMsg(
														" 健康状况记录_住院治疗情况  保存 失败   ");
										flag = true;
										break;
									}
								}
							}

							if (!flag) {
								// 执行插入 健康状况记录_主要用药情况 表
								flag = false;
								if (null != jsonZyyyqk) {
									for (int j = 0; j < jsonZyyyqk.size(); j++) {
										JSONObject zyyyqk = (JSONObject) jsonZyyyqk
												.get(j);

										sql = jsonDate.dealListInsert(
												"phr_grda_jkzk_zyyyqk", zyyyqk,
												grbh);
										log4.log.info(" -=-=-=-=-=- -=-=-=-= savePdData 方法里面  执行的  zyyyqk sql 为：  -=-=-=-= - -=-=-=-=-="
												+ sql);

										i = jdbcTemplate.update(sql);

										if (i < 0) {
											conn.rollback();
											response.getDout().getStatus()
													.setResultCode(-100015);
											response.getDout()
													.getStatus()
													.setResultMsg(
															" 健康状况记录_主要用药情况  保存 失败   ");
											flag = true;
											break;
										}
									}

									if (!flag) {
										// 健康状况记录_非免疫规划预防接种史
										flag = false;
										if (null != jsonFmyjzs) {
											for (int j = 0; j < jsonFmyjzs
													.size(); j++) {
												JSONObject fmyjzs = (JSONObject) jsonFmyjzs
														.get(j);

												sql = jsonDate.dealListInsert(
														"phr_grda_jkzk_fmyjzs",
														fmyjzs, grbh);
												log4.log.info(" -=-=-=-=-=- -=-=-=-= savePdData 方法里面  执行的  fmyjzs sql 为：  -=-=-=-= - -=-=-=-=-="
														+ sql);

												i = jdbcTemplate.update(sql);

												if (i < 0) {
													conn.rollback();
													response.getDout()
															.getStatus()
															.setResultCode(
																	-100016);
													response.getDout()
															.getStatus()
															.setResultMsg(
																	" 健康状况记录_非免疫规划预防接种史  保存 失败   ");
													flag = true;
													break;
												}
											}

										}
									}

									if (!flag) {
										// 健康状况记录_异常情况
										if (null != jsonWtml) {
											for (int j = 0; j < jsonWtml.size(); j++) {
												JSONObject wtml = (JSONObject) jsonWtml
														.get(j);

												sql = jsonDate.dealListInsert(
														"phr_grda_wtml", wtml,
														grbh);
												log4.log.info(" -=-=-=-=-=- -=-=-=-= savePdData 方法里面  执行的  jkzkpjb sql 为：  -=-=-=-= - -=-=-=-=-="
														+ sql);

												i = jdbcTemplate.update(sql);

												if (i < 0) {
													conn.rollback();
													response.getDout()
															.getStatus()
															.setResultCode(
																	-100017);
													response.getDout()
															.getStatus()
															.setResultMsg(
																	" 健康状况记录_非免疫规划预防接种史  保存 失败   ");
													flag = true;
													break;
												}
											}

										}
									}

								}
							}
						}
					} else {
						response.getDout().getStatus().setResultCode(-100018);
						response.getDout().getStatus()
								.setResultMsg(" 前台传入的 主表数据  为空     ");
					}
				}

			} else {
				response.getDout().getStatus().setResultCode(-100019);
				response.getDout().getStatus()
						.setResultMsg(" jsonJkzk 列表为空     ");
			}
		} catch (Exception e) {
			// TODO: handle exception
			conn.rollback();
			msg = e.getMessage();
			response.getDout().getStatus().setResultCode(-99);
			response.getDout().getStatus().setResultMsg(msg);
			e.printStackTrace();
		}

		// 拿取返回结果
		String jsons = response.toString(response);
		jDataOut = JSONObject.fromObject(jsons);
		// JSONObject d = JSONObject.fromObject(jsons);
		jDataOut.put("dout", "");
		return jDataOut;
	}

	/**
	 * 个人档案 更新（ 包括 健康状况记录 、 健康状况记录_住院治疗情况 、 健康状况记录_主要用药情况 、 健康状况记录_非免疫规划预防接种史 、
	 * 健康状况评价表 ） resultCode : -100020 ： 健康状况记录_住院治疗情况 删除 失败 -100021 ：
	 * 健康状况记录_住院治疗情况 更新 失败 -100022 ： 康状况记录_主要用药情况 删除 失败 -100023 ： 康状况记录_主要用药情况
	 * 更新 失败 -100024 : 健康状况记录_非免疫规划预防接种史 删除 失败 -100025 : 健康状况记录_非免疫规划预防接种史 更新 失败
	 * -100026 : 健康状况记录_异常情况 删除 失败 -100027 : 健康状况记录_异常情况 更新 失败 -100028 : 健康状况记录
	 * 更新 失败 -100029 : 查询不到该 id -100030: grdaJkzk 列表为空 ！
	 */
	public JSONObject heathUpdateData(JSONObject dataIn) throws SQLException {
		JSONObject jDataOut = new JSONObject();

		JSONObject din = (JSONObject) dataIn.get("din");
		JSONObject jsonJkzk = (JSONObject) din.get("grdaJkzk");
		JSONArray jsonZyzlqk = (JSONArray) din.get("grdaZyzlqk");
		JSONArray jsonZyyyqk = (JSONArray) din.get("grdaZyyyqk");
		JSONArray jsonFmyjzs = (JSONArray) din.get("grdaFmyjzs");
		JSONArray jsonWtml = (JSONArray) din.get("grdaWtml");

		String jkzkId = "";

		String msg = "";
		CallableStatement call = null;
		ResultSet result = null;
		String sql = "";
		String grbh = "";
		int i = 0;
		boolean flag = false;

		Connection conn = DataSourceUtils.getConnection(jdbcTemplate
				.getDataSource());
		VdsResponse response = new VdsResponse();
		response.getDout().getStatus().setResultCode(1);
		response.getDout().getStatus().setResultMsg(" 成功更新  ");
		try {
			if (null != jsonJkzk) {

				jkzkId = (String) jsonJkzk.get("id");
				grbh = (String) jsonJkzk.get("grbh");

				call = conn
						.prepareCall("{  call proGrdaByIdSelect( 'phr_grda_jkzk' , \"'"
								+ jkzkId + "'\" )  }");

				result = call.executeQuery();

				if (result.next()) {
					if (null == grbh || "".equals(grbh)) {
						return heathDeleteData(jkzkId);
					} else {
						// 执行 健康健康状况记录 的跟新
						sql = jsonDate.dealListUpdate("phr_grda_jkzk",
								jsonJkzk, jkzkId);

						i = jdbcTemplate.update(sql);
						if (i > 0) {

							// 处理 健康状况记录_住院治疗情况 数据，先执行删除原来数据，在插入全部的现在前台请求的数据
							// 执行 健康状况记录_住院治疗情况

							sql = " update phr_grda_jkzk_zyzlqk set zfbj = 1 where grbh = ?";
							i = jdbcTemplate.update(sql, grbh);

							if (i < 0) {
								conn.rollback();
								response.getDout().getStatus()
										.setResultCode(-100020);
								response.getDout().getStatus()
										.setResultMsg(" 健康状况记录_住院治疗情况 删除 失败 ");
								flag = true;
							} else {
								if (null != jsonZyzlqk) {
									for (int j = 0; j < jsonZyzlqk.size(); j++) {
										JSONObject zyzlqk = (JSONObject) jsonZyzlqk
												.get(j);
										sql = jsonDate.dealListInsert(
												"phr_grda_jkzk_zyzlqk", zyzlqk,
												grbh);
										i = jdbcTemplate.update(sql);
										if (i < 0) {
											// 证明插入不成功
											conn.rollback();
											response.getDout().getStatus()
													.setResultCode(-100021);
											response.getDout()
													.getStatus()
													.setResultMsg(
															"  健康状况记录_住院治疗情况 更新 失败   ");
											flag = true;
											break;
										}
									}
								}

								if (!flag) {
									flag = false;

									sql = "update phr_grda_jkzk_zyyyqk set zfbj = 1 where grbh = ? ";
									i = jdbcTemplate.update(sql, grbh);
									if (i < 0) {
										// 证明插入不成功
										conn.rollback();
										response.getDout().getStatus()
												.setResultCode(-100022);
										response.getDout()
												.getStatus()
												.setResultMsg(
														"  健康状况记录_主要用药情况 删除  失败   ");
										flag = true;
									} else {
										if (null != jsonZyyyqk) {
											for (int j = 0; j < jsonZyyyqk
													.size(); j++) {
												JSONObject zyyyqk = (JSONObject) jsonZyyyqk
														.get(j);
												sql = jsonDate.dealListInsert(
														"phr_grda_jkzk_zyyyqk",
														zyyyqk, grbh);

												i = jdbcTemplate.update(sql);
												if (i < 0) {
													// 证明插入不成功
													conn.rollback();
													response.getDout()
															.getStatus()
															.setResultCode(
																	-100023);
													response.getDout()
															.getStatus()
															.setResultMsg(
																	" 康状况记录_主要用药情况  更新 失败   ");
													flag = true;
													break;
												}
											}
										}

										if (!flag) {
											flag = false;
											sql = "update phr_grda_jkzk_fmyjzs set zfbj = 1 where grbh = ? ";
											i = jdbcTemplate.update(sql, grbh);
											if (i < 0) {
												// 证明插入不成功
												conn.rollback();
												response.getDout().getStatus()
														.setResultCode(-100024);
												response.getDout()
														.getStatus()
														.setResultMsg(
																" 健康状况记录_非免疫规划预防接种史  删除  失败   ");
												flag = true;
											} else {
												if (null != jsonFmyjzs) {
													for (int j = 0; j < jsonFmyjzs
															.size(); j++) {
														JSONObject fmyjzs = (JSONObject) jsonFmyjzs
																.get(j);

														sql = jsonDate
																.dealListInsert(
																		"phr_grda_jkzk_fmyjzs",
																		fmyjzs,
																		grbh);
														i = jdbcTemplate
																.update(sql);
														if (i < 0) {
															// 证明插入不成功
															conn.rollback();
															response.getDout()
																	.getStatus()
																	.setResultCode(
																			-100025);
															response.getDout()
																	.getStatus()
																	.setResultMsg(
																			" 健康状况记录_非免疫规划预防接种史  更新 失败   ");
															flag = true;
															break;
														}
													}

												}

												if (!flag) {
													flag = false;

													sql = "update phr_grda_wtml set zfbj = 1 where grbh = ? ";
													i = jdbcTemplate.update(
															sql, grbh);
													if (i < 0) {
														// 证明插入不成功
														conn.rollback();
														response.getDout()
																.getStatus()
																.setResultCode(
																		-100026);
														response.getDout()
																.getStatus()
																.setResultMsg(
																		" 健康状况记录_异常情况 更新 失败   ");
														flag = true;
													} else {
														if (null != jsonWtml) {
															for (int j = 0; j < jsonWtml
																	.size(); j++) {
																JSONObject wtml = (JSONObject) jsonWtml
																		.get(j);
																sql = jsonDate
																		.dealListInsert(
																				"phr_grda_wtml",
																				wtml,
																				grbh);
																i = jdbcTemplate
																		.update(sql);
																if (i < 0) {
																	// 证明插入不成功
																	conn.rollback();
																	response.getDout()
																			.getStatus()
																			.setResultCode(
																					-100027);
																	response.getDout()
																			.getStatus()
																			.setResultMsg(
																					" 健康状况记录_异常情况  更新 失败   ");
																	flag = true;
																	break;
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						} else {
							conn.rollback();
							response.getDout().getStatus()
									.setResultCode(-100028);
							response.getDout().getStatus()
									.setResultMsg(" 健康状况记录  更新 失败 ");
						}
					}
				} else {
					response.getDout().getStatus().setResultCode(-100029);
					response.getDout().getStatus().setResultMsg(" 查询不到该 id ");
				}
			} else {
				response.getDout().getStatus().setResultCode(-100030);
				response.getDout().getStatus().setResultMsg(" grdaJkzk 列表为空 ！");
			}
		} catch (Exception e) {
			// TODO: handle exception
			conn.rollback();
			msg = e.getMessage();
			response.getDout().getStatus().setResultCode(-99);
			response.getDout().getStatus().setResultMsg(msg);
			e.printStackTrace();
		}

		// 拿取返回结果
		String jsons = response.toString(response);
		jDataOut = JSONObject.fromObject(jsons);
		// JSONObject d = JSONObject.fromObject(jsons);
		jDataOut.put("dout", "");
		return jDataOut;
	}

	/**
	 * 删除个人档案 （ 包括 健康状况记录 ) resultCode : -100031 : 健康状况记录 删除 失败！
	 * 
	 * @throws SQLException
	 */
	public JSONObject heathDeleteData(String id) throws SQLException {

		JSONObject jDataOut = new JSONObject();

		String msg = "";
		String sql = "";
		int i = 0;

		Connection conn = DataSourceUtils.getConnection(jdbcTemplate
				.getDataSource());
		VdsResponse response = new VdsResponse();
		response.getDout().getStatus().setResultCode(1);
		response.getDout().getStatus().setResultMsg(" 删除成功！  ");
		try {

			if (!"".equals(id)) {
				sql = "update phr_grda_jkzk set zfbj = 1 where id = ?";

				i = jdbcTemplate.update(sql, id);

				if (i < 0) {
					response.getDout().getStatus().setResultCode(-100031);
					response.getDout().getStatus()
							.setResultMsg("健康状况记录  删除  失败！");
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			conn.rollback();
			msg = e.getMessage();
			response.getDout().getStatus().setResultCode(-99);
			response.getDout().getStatus().setResultMsg(msg);
			e.printStackTrace();
		}

		// 拿取返回结果
		String jsons = response.toString(response);
		jDataOut = JSONObject.fromObject(jsons);
		// JSONObject d = JSONObject.fromObject(jsons);
		jDataOut.put("dout", "");
		return jDataOut;
	}

	/**
	 * 保存高血压表(包括 高血压_随访表 、 高血压_随访表_用药情况 ) resultCode :　-100001　：　前台传入数据数据 id 有误
	 * 　 -100032 : 高血压_随访表 保存 失败 -100033 : 高血压_随访表_用药情况 保存 失败 -100034 : 前台 传进来的
	 * 高血压_随访表 列表 为空
	 */
	public JSONObject gxySaveData(JSONObject dataIn) throws SQLException {

		JSONObject jDataOut = new JSONObject();
		JSONObject din = (JSONObject) dataIn.get("din");
		JSONObject jsonGxyJxb = (JSONObject) din.get("gxyJxb");
		JSONArray jsonGxyYyqk = (JSONArray) din.get("gxyYyqk");

		String msg = "";
		String sql = "";
		String gxyJxbId = "";
		String grbh = "";
		int i = 0;
		boolean flag = false;

		Connection conn = DataSourceUtils.getConnection(jdbcTemplate
				.getDataSource());
		VdsResponse response = new VdsResponse();
		response.getDout().getStatus().setResultCode(1);
		response.getDout().getStatus().setResultMsg(" 保存成功！  ");
		try {
			if (null != jsonGxyJxb) {
				gxyJxbId = (String) jsonGxyJxb.get("id");
				grbh = (String) jsonGxyJxb.get("grbh");

				if (null != gxyJxbId
						&& org.apache.commons.lang.StringUtils
								.isNotEmpty(gxyJxbId)) {
					response.getDout().getStatus().setResultCode(-100001);
					response.getDout().getStatus()
							.setResultMsg(" 前台传入数据数据 id 有误 ");
				} else {
					if (null != grbh
							&& org.apache.commons.lang.StringUtils
									.isNotEmpty(grbh)) {

						sql = jsonDate.dealListInsert("phr_jbzd_gxy_sfb2",
								jsonGxyJxb, grbh);
						i = jdbcTemplate.update(sql);
						if (i < 0) {
							conn.rollback();
							response.getDout().getStatus()
									.setResultCode(-100032);
							response.getDout().getStatus()
									.setResultMsg(" 高血压_随访表  保存 失败   ");
							flag = true;
						} else {
							if (!flag) {
								if (null != jsonGxyYyqk) {
									for (int j = 0; j < jsonGxyYyqk.size(); j++) {
										JSONObject gxyYyqk = (JSONObject) jsonGxyYyqk
												.get(j);
										sql = jsonDate.dealListInsert(
												"phr_jbzd_gxy_sfb2_yyqk",
												gxyYyqk, grbh);
										i = jdbcTemplate.update(sql);
										if (i < 0) {
											conn.rollback();
											response.getDout().getStatus()
													.setResultCode(-100033);
											response.getDout()
													.getStatus()
													.setResultMsg(
															" 高血压_随访表_用药情况  保存 失败   ");
											flag = true;
										}
									}
								}
							}

						}
					}

				}
			} else {
				response.getDout().getStatus().setResultCode(-100034);
				response.getDout().getStatus()
						.setResultMsg(" 前台 传进来的 高血压_随访表  列表  为空  ");
			}
		} catch (Exception e) {
			// TODO: handle exception
			conn.rollback();
			msg = e.getMessage();
			response.getDout().getStatus().setResultCode(-99);
			response.getDout().getStatus().setResultMsg(msg);
			e.printStackTrace();
		}

		// 拿取返回结果
		String jsons = response.toString(response);
		jDataOut = JSONObject.fromObject(jsons);
		// JSONObject d = JSONObject.fromObject(jsons);
		jDataOut.put("dout", "");
		return jDataOut;
	}

	/**
	 * 更新 高血压表(包括 高血压_随访表 、 高血压_随访表_用药情况 ) resultCode -100035 : 高血压_随访表 更新 失败
	 * -100036 : 高血压_随访表_用药情况 删除 失败 -100037 　： 高血压_随访表_用药情况 更新 失败
	 * 
	 * @throws SQLException
	 */
	public JSONObject gxyUpdateData(JSONObject dataIn) throws SQLException {
		JSONObject jDataOut = new JSONObject();
		JSONObject din = (JSONObject) dataIn.get("din");
		JSONObject jsonGxyJxb = (JSONObject) din.get("gxyJxb");
		JSONArray jsonGxyYyqk = (JSONArray) din.get("gxyYyqk");

		String msg = "";
		String sql = "";
		String gxyJxbId = "";
		String grbh = "";
		CallableStatement call = null;
		ResultSet result = null;
		int i = 0;
		boolean flag = false;

		Connection conn = DataSourceUtils.getConnection(jdbcTemplate
				.getDataSource());
		VdsResponse response = new VdsResponse();
		response.getDout().getStatus().setResultCode(1);
		response.getDout().getStatus().setResultMsg(" 保存成功！  ");
		try {
			if (null != jsonGxyJxb) {

				gxyJxbId = (String) jsonGxyJxb.get("id");
				call = conn
						.prepareCall("{ call proGrdaByIdSelect ( 'phr_jbzd_gxy_sfb2' , \"'"
								+ gxyJxbId + "'\" ) }");
				result = call.executeQuery();
				if (result.next()) {
					grbh = (String) jsonGxyJxb.get("grbh");
					if (null == grbh) {
						return gxyDeteleData(gxyJxbId);
					} else {
						sql = jsonDate.dealListUpdate("phr_jbzd_gxy_sfb2",
								jsonGxyJxb, gxyJxbId);
						i = jdbcTemplate.update(sql);
						if (i < 0) {
							conn.rollback();
							response.getDout().getStatus()
									.setResultCode(-100035);
							response.getDout().getStatus()
									.setResultMsg(" 高血压_随访表_用药情况  更新   失败   ");
							flag = true;
						} else {
							if (null != jsonGxyYyqk) {

								sql = "update phr_jbzd_gxy_sfb2_yyqk set zfbj = 1 where grbh = ?";
								i = jdbcTemplate.update(sql, grbh);
								if (i < 0) {
									conn.rollback();
									response.getDout().getStatus()
											.setResultCode(-100036);
									response.getDout()
											.getStatus()
											.setResultMsg(
													" 高血压_随访表_用药情况  删除   失败   ");
									flag = true;
								} else {
									for (int j = 0; j < jsonGxyYyqk.size(); j++) {
										JSONObject gxyYyqk = (JSONObject) jsonGxyYyqk
												.get(j);

										sql = jsonDate.dealListInsert(
												"phr_jbzd_gxy_sfb2_yyqk",
												gxyYyqk, grbh);
										i = jdbcTemplate.update(sql);
										if (i < 0) {
											conn.rollback();
											response.getDout().getStatus()
													.setResultCode(-100037);
											response.getDout()
													.getStatus()
													.setResultMsg(
															" 高血压_随访表_用药情况  更新   失败   ");
											flag = true;
										}
									}

								}
							}

						}

					}

				} else {
					response.getDout().getStatus().setResultCode(-100035);
					response.getDout().getStatus().setResultMsg(" 查无此人  ");
				}

			}

		} catch (Exception e) {
			// TODO: handle exception
			conn.rollback();
			msg = e.getMessage();
			response.getDout().getStatus().setResultCode(-99);
			response.getDout().getStatus().setResultMsg(msg);
			e.printStackTrace();
		}

		// 拿取返回结果
		String jsons = response.toString(response);
		jDataOut = JSONObject.fromObject(jsons);
		// JSONObject d = JSONObject.fromObject(jsons);
		jDataOut.put("dout", "");
		return jDataOut;
	}

	/**
	 * 删除个人档案 （ 包括 高血压_随访表 ) resultCode : -100038 : 高血压_随访表 更删除失败！
	 * 
	 * @throws SQLException
	 */
	public JSONObject gxyDeteleData(String id) throws SQLException {

		JSONObject jDataOut = new JSONObject();

		String msg = "";
		String sql = "";
		int i = 0;

		Connection conn = DataSourceUtils.getConnection(jdbcTemplate
				.getDataSource());
		VdsResponse response = new VdsResponse();
		response.getDout().getStatus().setResultCode(1);
		response.getDout().getStatus().setResultMsg(" 删除成功！  ");
		try {

			if (!"".equals(id)) {
				sql = "update phr_jbzd_gxy_sfb2 set zfbj = 1 where id = ?";

				i = jdbcTemplate.update(sql, id);

				if (i < 0) {
					response.getDout().getStatus().setResultCode(-100038);
					response.getDout().getStatus()
							.setResultMsg("高血压_随访表 删除失败！");
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			conn.rollback();
			msg = e.getMessage();
			response.getDout().getStatus().setResultCode(-99);
			response.getDout().getStatus().setResultMsg(msg);
			e.printStackTrace();
		}

		// 拿取返回结果
		String jsons = response.toString(response);
		jDataOut = JSONObject.fromObject(jsons);
		// JSONObject d = JSONObject.fromObject(jsons);
		jDataOut.put("dout", "");
		return jDataOut;
	}

	/**
	 * 保存糖尿病（糖尿病_随访记录 、 糖尿病_随访记录_用药情况） resultCode :　-100001　：　前台传入数据数据 id 有误 　
	 * -100039 : 糖尿病_随访记录 保存 失败 -100040 : 糖尿病_随访记录_用药情况 保存 失败 -100034 : 前台 传进来的
	 * 高血压_随访表 列表 为空
	 */
	public JSONObject saveTnbData(JSONObject dataIn) throws SQLException {

		JSONObject jDataOut = new JSONObject();
		JSONObject din = (JSONObject) dataIn.get("din");
		JSONObject jsonTnbSfjl = (JSONObject) din.get("tnbSfjl");
		JSONArray jsonTnbYyqk = (JSONArray) din.get("tnbYyqk");

		String msg = "";
		String sql = "";
		String gxyJxbId = "";
		String grbh = "";
		int i = 0;
		boolean flag = false;

		Connection conn = DataSourceUtils.getConnection(jdbcTemplate
				.getDataSource());
		VdsResponse response = new VdsResponse();
		response.getDout().getStatus().setResultCode(1);
		response.getDout().getStatus().setResultMsg(" 保存成功！  ");
		try {
			if (null != jsonTnbSfjl) {
				gxyJxbId = (String) jsonTnbSfjl.get("id");
				grbh = (String) jsonTnbSfjl.get("grbh");

				if (null != gxyJxbId
						&& org.apache.commons.lang.StringUtils
								.isNotEmpty(gxyJxbId)) {
					response.getDout().getStatus().setResultCode(-100001);
					response.getDout().getStatus()
							.setResultMsg(" 前台传入数据数据 id 有误 ");
				} else {
					if (null != grbh
							&& org.apache.commons.lang.StringUtils
									.isNotEmpty(grbh)) {

						sql = jsonDate.dealListInsert("phr_jbzd_tnb_sfjl2",
								jsonTnbSfjl, grbh);
						i = jdbcTemplate.update(sql);
						if (i < 0) {
							conn.rollback();
							response.getDout().getStatus()
									.setResultCode(-100039);
							response.getDout().getStatus()
									.setResultMsg(" 糖尿病_随访记录  保存 失败   ");
							flag = true;
						} else {
							if (!flag) {
								if (null != jsonTnbYyqk) {
									for (int j = 0; j < jsonTnbYyqk.size(); j++) {
										JSONObject tnbYyqk = (JSONObject) jsonTnbYyqk
												.get(j);
										sql = jsonDate.dealListInsert(
												"phr_jbzd_tnb_sfjl2_yyqk",
												tnbYyqk, grbh);
										i = jdbcTemplate.update(sql);
										if (i < 0) {
											conn.rollback();
											response.getDout().getStatus()
													.setResultCode(-100040);
											response.getDout()
													.getStatus()
													.setResultMsg(
															" 糖尿病_随访记录_用药情况  保存 失败   ");
											flag = true;
										}
									}
								}
							}

						}
					}

				}
			} else {
				response.getDout().getStatus().setResultCode(-100034);
				response.getDout().getStatus()
						.setResultMsg(" 前台 传进来的 高血压_随访表  列表  为空  ");
			}
		} catch (Exception e) {
			// TODO: handle exception
			conn.rollback();
			msg = e.getMessage();
			response.getDout().getStatus().setResultCode(-99);
			response.getDout().getStatus().setResultMsg(msg);
			e.printStackTrace();
		}

		// 拿取返回结果
		String jsons = response.toString(response);
		jDataOut = JSONObject.fromObject(jsons);
		// JSONObject d = JSONObject.fromObject(jsons);
		jDataOut.put("dout", "");
		return jDataOut;
	}

	/**
	 * 更新糖尿病（糖尿病_随访记录 、 糖尿病_随访记录_用药情况） resultCode -100041 : 糖尿病_随访记录 更新 失败
	 * -100042 : 糖尿病_随访记录_用药情况 删除 失败 -100043 　： 糖尿病_随访记录_用药情况 更新 失败
	 */
	public JSONObject updateTnbData(JSONObject dataIn) throws SQLException {
		JSONObject jDataOut = new JSONObject();
		JSONObject din = (JSONObject) dataIn.get("din");
		JSONObject jsonTnbSfjl = (JSONObject) din.get("tnbSfjl");
		JSONArray jsonTnbYyqk = (JSONArray) din.get("tnbYyqk");

		String msg = "";
		String sql = "";
		String TnbSfjlId = "";
		String grbh = "";
		CallableStatement call = null;
		ResultSet result = null;
		int i = 0;
		boolean flag = false;

		Connection conn = DataSourceUtils.getConnection(jdbcTemplate
				.getDataSource());
		VdsResponse response = new VdsResponse();
		response.getDout().getStatus().setResultCode(1);
		response.getDout().getStatus().setResultMsg(" 更新成功！  ");
		try {
			if (null != jsonTnbSfjl) {

				TnbSfjlId = (String) jsonTnbSfjl.get("id");
				call = conn
						.prepareCall("{ call proGrdaByIdSelect ( 'phr_jbzd_tnb_sfjl2' , \"'"
								+ TnbSfjlId + "'\" ) }");
				result = call.executeQuery();
				if (result.next()) {
					grbh = (String) jsonTnbSfjl.get("grbh");
					if (null == grbh) {
						return tnbDeleteData(TnbSfjlId);
					} else {
						sql = jsonDate.dealListUpdate("phr_jbzd_tnb_sfjl2",
								jsonTnbSfjl, TnbSfjlId);
						i = jdbcTemplate.update(sql);
						if (i < 0) {
							conn.rollback();
							response.getDout().getStatus()
									.setResultCode(-100041);
							response.getDout().getStatus()
									.setResultMsg(" 糖尿病_随访记录  更新   失败   ");
							flag = true;
						} else {
							if (null != jsonTnbYyqk) {

								sql = "update phr_jbzd_tnb_sfjl2_yyqk set zfbj = 1 where grbh = ?";
								i = jdbcTemplate.update(sql, grbh);
								if (i < 0) {
									conn.rollback();
									response.getDout().getStatus()
											.setResultCode(-100042);
									response.getDout()
											.getStatus()
											.setResultMsg(
													" 糖尿病_随访记录_用药情况   删除   失败   ");
									flag = true;
								} else {
									for (int j = 0; j < jsonTnbYyqk.size(); j++) {
										JSONObject gxyYyqk = (JSONObject) jsonTnbYyqk
												.get(j);

										sql = jsonDate.dealListInsert(
												"phr_jbzd_tnb_sfjl2_yyqk",
												gxyYyqk, grbh);
										i = jdbcTemplate.update(sql);
										if (i < 0) {
											conn.rollback();
											response.getDout().getStatus()
													.setResultCode(-100043);
											response.getDout()
													.getStatus()
													.setResultMsg(
															" 糖尿病_随访记录_用药情况   更新   失败   ");
											flag = true;
										}
									}
								}
							}
						}
					}

				} else {
					response.getDout().getStatus().setResultCode(-100035);
					response.getDout().getStatus().setResultMsg(" 查无此人  ");
				}

			}

		} catch (Exception e) {
			// TODO: handle exception
			conn.rollback();
			msg = e.getMessage();
			response.getDout().getStatus().setResultCode(-99);
			response.getDout().getStatus().setResultMsg(msg);
			e.printStackTrace();
		}

		// 拿取返回结果
		String jsons = response.toString(response);
		jDataOut = JSONObject.fromObject(jsons);
		// JSONObject d = JSONObject.fromObject(jsons);
		jDataOut.put("dout", "");
		return jDataOut;
	}

	/**
	 * 删除个人档案 （ 包括 糖尿病_随访记录 ) resultCode : -100044 : 糖尿病_随访记录 删除 失败！
	 * 
	 * @throws SQLException
	 */
	public JSONObject tnbDeleteData(String id) throws SQLException {

		JSONObject jDataOut = new JSONObject();

		String msg = "";
		String sql = "";
		int i = 0;

		Connection conn = DataSourceUtils.getConnection(jdbcTemplate
				.getDataSource());
		VdsResponse response = new VdsResponse();
		response.getDout().getStatus().setResultCode(1);
		response.getDout().getStatus().setResultMsg(" 删除成功！  ");
		try {

			if (!"".equals(id)) {
				sql = "update phr_jbzd_tnb_sfjl2 set zfbj = 1 where id = ?";

				i = jdbcTemplate.update(sql, id);

				if (i < 0) {
					response.getDout().getStatus().setResultCode(-100044);
					response.getDout().getStatus()
							.setResultMsg("糖尿病_随访记录  删除  失败！");
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			conn.rollback();
			msg = e.getMessage();
			response.getDout().getStatus().setResultCode(-99);
			response.getDout().getStatus().setResultMsg(msg);
			e.printStackTrace();
		}

		// 拿取返回结果
		String jsons = response.toString(response);
		jDataOut = JSONObject.fromObject(jsons);
		// JSONObject d = JSONObject.fromObject(jsons);
		jDataOut.put("dout", "");
		return jDataOut;
	}

	/**
	 * 保存老年人（老年人随访表） resultCode :　-100001　：　前台传入数据数据 id 有误 -100045 ： 老年人随访表 保存
	 * 失败
	 * 
	 */
	public JSONObject lnrSaveData(JSONObject dataIn) throws SQLException {

		JSONObject jDataOut = new JSONObject();
		JSONObject din = (JSONObject) dataIn.get("din");
		JSONObject jsonLnrSfb = (JSONObject) din.get("lnrSfb");

		String msg = "";
		String sql = "";
		String gxyJxbId = "";
		String grbh = "";
		int i = 0;
		boolean flag = false;

		Connection conn = DataSourceUtils.getConnection(jdbcTemplate
				.getDataSource());
		VdsResponse response = new VdsResponse();
		response.getDout().getStatus().setResultCode(1);
		response.getDout().getStatus().setResultMsg(" 保存成功！  ");
		try {
			if (null != jsonLnrSfb) {
				gxyJxbId = (String) jsonLnrSfb.get("id");
				grbh = (String) jsonLnrSfb.get("grbh");

				if (null != gxyJxbId
						&& org.apache.commons.lang.StringUtils
								.isNotEmpty(gxyJxbId)) {
					response.getDout().getStatus().setResultCode(-100001);
					response.getDout().getStatus()
							.setResultMsg(" 前台传入数据数据 id 有误 ");
				} else {
					if (null != grbh
							&& org.apache.commons.lang.StringUtils
									.isNotEmpty(grbh)) {

						sql = jsonDate.dealListInsert("phr_jbzd_lnr_sfb",
								jsonLnrSfb, grbh);
						i = jdbcTemplate.update(sql);
						if (i < 0) {
							conn.rollback();
							response.getDout().getStatus()
									.setResultCode(-100045);
							response.getDout().getStatus()
									.setResultMsg(" 老年人随访表  保存 失败   ");
							flag = true;
						}
					}
				}
			} else {
				response.getDout().getStatus().setResultCode(-100034);
				response.getDout().getStatus()
						.setResultMsg(" 前台 传进来的 高血压_随访表  列表  为空  ");
			}
		} catch (Exception e) {
			// TODO: handle exception
			conn.rollback();
			msg = e.getMessage();
			response.getDout().getStatus().setResultCode(-99);
			response.getDout().getStatus().setResultMsg(msg);
			e.printStackTrace();
		}

		// 拿取返回结果
		String jsons = response.toString(response);
		jDataOut = JSONObject.fromObject(jsons);
		// JSONObject d = JSONObject.fromObject(jsons);
		jDataOut.put("dout", "");
		return jDataOut;
	}

	/**
	 * 更新老年人（老年人随访表） resultCode -100046 : 老年人随访表 更新 失败
	 */
	public JSONObject lnrUpdateData(JSONObject dataIn) throws SQLException {
		JSONObject jDataOut = new JSONObject();
		JSONObject din = (JSONObject) dataIn.get("din");
		JSONObject jsonLnrSfb = (JSONObject) din.get("lnrSfb");

		String msg = "";
		String sql = "";
		String lnrSfbId = "";
		String grbh = "";
		CallableStatement call = null;
		ResultSet result = null;
		int i = 0;

		Connection conn = DataSourceUtils.getConnection(jdbcTemplate
				.getDataSource());
		VdsResponse response = new VdsResponse();
		response.getDout().getStatus().setResultCode(1);
		response.getDout().getStatus().setResultMsg(" 更新成功！  ");
		try {
			if (null != jsonLnrSfb) {

				lnrSfbId = (String) jsonLnrSfb.get("id");
				call = conn
						.prepareCall("{ call proGrdaByIdSelect ( 'phr_jbzd_lnr_sfb' , \"'"
								+ lnrSfbId + "'\" ) }");
				result = call.executeQuery();
				if (result.next()) {
					grbh = (String) jsonLnrSfb.get("grbh");
					if (null == grbh) {
						return lnrDeleteData(lnrSfbId);
					} else {
						sql = jsonDate.dealListUpdate("phr_jbzd_lnr_sfb",
								jsonLnrSfb, lnrSfbId);
						i = jdbcTemplate.update(sql);
						if (i < 0) {
							conn.rollback();
							response.getDout().getStatus()
									.setResultCode(-100046);
							response.getDout().getStatus()
									.setResultMsg(" 老年人随访表  更新   失败   ");
						}
					}

				} else {
					response.getDout().getStatus().setResultCode(-100035);
					response.getDout().getStatus().setResultMsg(" 查无此人  ");
				}

			}

		} catch (Exception e) {
			// TODO: handle exception
			conn.rollback();
			msg = e.getMessage();
			response.getDout().getStatus().setResultCode(-99);
			response.getDout().getStatus().setResultMsg(msg);
			e.printStackTrace();
		}

		// 拿取返回结果
		String jsons = response.toString(response);
		jDataOut = JSONObject.fromObject(jsons);
		// JSONObject d = JSONObject.fromObject(jsons);
		jDataOut.put("dout", "");
		return jDataOut;
	}

	/**
	 * 删除个人档案 （ 包括 糖尿病_随访记录 ) resultCode : -100046 : 老年人随访表 删除 失败！
	 * 
	 * @throws SQLException
	 */
	public JSONObject lnrDeleteData(String id) throws SQLException {

		JSONObject jDataOut = new JSONObject();

		String msg = "";
		String sql = "";
		int i = 0;

		Connection conn = DataSourceUtils.getConnection(jdbcTemplate
				.getDataSource());
		VdsResponse response = new VdsResponse();
		response.getDout().getStatus().setResultCode(1);
		response.getDout().getStatus().setResultMsg(" 删除成功！  ");
		try {

			if (!"".equals(id)) {
				sql = "update phr_jbzd_lnr_sfb set zfbj = 1 where id = ?";

				i = jdbcTemplate.update(sql, id);

				if (i < 0) {
					response.getDout().getStatus().setResultCode(-100046);
					response.getDout().getStatus()
							.setResultMsg("老年人随访表  删除  失败！");
				}
			}
		} catch (Exception e) {
			// TODO: handle exception
			conn.rollback();
			msg = e.getMessage();
			response.getDout().getStatus().setResultCode(-99);
			response.getDout().getStatus().setResultMsg(msg);
			e.printStackTrace();
		}

		// 拿取返回结果
		String jsons = response.toString(response);
		jDataOut = JSONObject.fromObject(jsons);
		// JSONObject d = JSONObject.fromObject(jsons);
		jDataOut.put("dout", "");
		return jDataOut;
	}

	/**
	 * 		生成个人编号
	 * 	
	 * 
	 */
	public JSONObject getGrbh(JSONObject dataIn) {
		JSONObject jDataOut = new JSONObject();
		JSONObject json = new JSONObject();

		JSONObject din = (JSONObject) dataIn.get("din");
		String jwcm = (String) din.get("jwcm");
		String smc = (String) din.get("grda_xzz_smc");
		String qxmc = (String) din.get("grda_xzz_qxmc");
		String jdzmc = (String) din.get("grda_xzz_jdzmc");
		String jwcmc = (String) din.get("grda_xzz_jwcmc");
		String ljmc = (String) din.get("grda_xzz_ljmc");
		String qt = (String) din.get("grda_xzz_qt");
		String address = smc + qxmc + jdzmc + jwcmc + "居委" + ljmc + qt;
		//address= "广州市越秀区大东街东川居委前鉴通津42号";
		//jwcm = "署前"; 
		// 定义 grbh 先定死越秀区（440104） 和 大东街（019）
		StringBuffer grbh = new StringBuffer("440104019");
		String sql = "";
		String msg = "";
		CallableStatement call = null;
		ResultSet result = null;
		String code = "";
		// 户编号
		int s_sort = 0;

		Connection conn = DataSourceUtils.getConnection(jdbcTemplate
				.getDataSource());
		VdsResponse response = new VdsResponse();
		try {
			call = conn.prepareCall("{ call proGrbhJwcmSelect (  \"'" + jwcmc
					+ "'\"  ) }");

			result = call.executeQuery();
			if (result.next()) {
				code = result.getString("code");
				s_sort = result.getInt("s_sort");

				grbh.append("0" + code);
				
				DecimalFormat df1 = new DecimalFormat("0000");
				// 判断是否是同一家人
				call = conn.prepareCall("{ call proGrbnSortSelect (  \"'" + address
						+ "'\"  ) }");

				result = call.executeQuery();
				if(result.next()){
					//证明有家人在
					String grbhs = result.getString("grbh");
					if(grbhs.length() == 16){
						//这个是老会员
						grbh.append(df1.format(s_sort));
						grbh.append("01");
						s_sort = s_sort + 1;
					}else if (grbhs.length() == 18){
					   //这个是新会员
						grbhs = grbhs.substring(grbhs.length() - 1);
						int num = Integer.parseInt(grbhs);
						if (num >= 9) {
							//如果用户人数超过10，就是开用新户
							grbh.append(df1.format(s_sort));
							grbh.append("01");
							s_sort = s_sort + 1;						
						}else{
							String newOne  = result.getString("grbh").substring(12, 16);
							System.out.println("zdvdsvdsvdsvsdvsdvdsv     " + newOne);
							s_sort = Integer.parseInt(newOne);
							grbh.append(df1.format(s_sort));
							grbh.append("0"+(num + 1));
						}
					}
				}else{
					//没有家人在
					grbh.append(df1.format(s_sort));
					grbh.append("01");
					s_sort = s_sort + 1;
				}

				/*
				 * if(s_sort == 0 ){ s_sort = 1;
				 * grbh.append(df1.format(number)); }else if( s_sort / 10 == 0
				 * ){ grbh.append("000"+s_sort); }else if(s_sort / 100 == 0){
				 * grbh.append("00"+s_sort); }else if(s_sort / 1000 == 0){
				 * grbh.append("0"+s_sort); }else { grbh.append(s_sort); }
				 */	
				/*log4.log.info("输出的数据是： " + grbh.toString());
				call = conn.prepareCall("{ call proAllGrdaGrbhSelect( \"'"
						+ grbh.toString() + "%'\" ) }");
				result = call.executeQuery();*/
				// log4.log.info("输出的数据是： " + grbh.delete(grbh.length()-4,
				// grbh.length()));
				/*if (result.next()) {
					String grbhs = result.getString("grbh");
					grbhs = grbhs.substring(grbhs.length() - 3);
					int num = Integer.parseInt(grbhs);
					if (num >= 9) {
						grbh.delete(grbh.length() - 4, grbh.length()).append(
								(df1.format((s_sort + 1))) + "01");
					} else {
						grbh.append(num + 1);
					}
				} else {
					grbh.append("01");
				}*/

				//s_sort = s_sort + 1;
				sql = " update sys_dict set s_sort = ? where code  = ? ";
				int i = jdbcTemplate.update(sql, s_sort, code);
				if (i < 0) {
					response.getDout().getStatus().setResultCode(-100047);
					response.getDout().getStatus().setResultMsg(" 个人编码获取失败 ");
				}
			}

			json.put("grbh", grbh.toString());
		} catch (SQLException e) {
			msg = e.getMessage();
			response.getDout().getStatus().setResultCode(-99);
			response.getDout().getStatus().setResultMsg(msg);
			e.printStackTrace();
		}

		// 拿取返回结果
		String jsons = response.toString(response);
		jDataOut = JSONObject.fromObject(jsons);
		jDataOut.put("dout", json);
		return jDataOut;
	}

	/**
	 * 添加用户足迹环节
	 * 
	 * @param jdbcTemplate
	 *            数据库
	 * @param phone
	 *            电话
	 * @param memberId
	 *            用户id
	 * @param process
	 *            环节
	 * @param additional
	 *            附加字段
	 */
	@Transactional(propagation = Propagation.REQUIRED)
	public void addProcess(JdbcTemplate jdbcTemplate, String actionTitle,
			String phone, String memberId, String process, String additional) {
		String sql = null;
		sql = "INSERT INTO med_ process (id,createDate,phone,memberId,process,additional) "
				+ "VALUES (UUID(),now(),'"
				+ phone
				+ "','"
				+ memberId
				+ "','"
				+ process + "', '" + additional + "')";
		jdbcTemplate.update(sql);
	}

}
