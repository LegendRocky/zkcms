<template>
	<div class="app-container">
		<el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-document" @click="handleDownload">导出EXCEL</el-button>
		<el-button :loading="downloadLoading" style="margin-bottom:20px" type="primary" icon="el-icon-document" @click="handlePrint">打印报表</el-button>

		<el-table
	      ref="multipleTable"
	      v-loading="listLoading"
	      :data="data"
	      element-loading-text="Loading"
	      border
	      fit
	      highlight-current-row
	    >
			<el-table-column align='center' :label="name">
				<el-table-column align='center' label="业绩目标">
					<el-table-column align='center' label="月份" width="50" prop="data1">
					</el-table-column>
					<el-table-column align='center' label="月签单目标" width="150" prop="data2">
					
					</el-table-column>
					<el-table-column align='center' label="实际销售额" width="150" prop="data3">
					
					</el-table-column>
					<el-table-column align='center' label="完成率" width="100" prop="data4">
					
					</el-table-column>
					<el-table-column align='center' label="个人签单目标" width="150" prop="data5">
					
					</el-table-column>
				</el-table-column>
			</el-table-column>
			<el-table-column align='center' :label="zhiwu">
				<el-table-column align='center' label="业绩">
					<el-table-column align='center' label="接待客户量" width="150" prop="data6">
				
					</el-table-column>
					<el-table-column align='center' label="实际签单量" width="150" prop="data7">
					
					</el-table-column>
					<el-table-column align='center' label="完成率" width="150" prop="data8">
					
					</el-table-column>
				</el-table-column>
			</el-table-column>
			<el-table-column align='center' label="年度总目标">
					<el-table-column align='center' label="签单量" width="150" prop="data9">
				
					</el-table-column>
			</el-table-column>
			<el-table-column align='center' label="客户满意度">
					<el-table-column align='center' label="转化率" width="150" prop="data10">
				
					</el-table-column>
			</el-table-column>
			<el-table-column align='center' label="客户关系管理">
					<el-table-column align='center' label="总客户量" width="150" prop="data11">
				
					</el-table-column>
					<el-table-column align='center' label="A类" width="50" prop="data12">
					
					</el-table-column>
					<el-table-column align='center' label="B类" width="50" prop="data13">
					
					</el-table-column>
					<el-table-column align='center' label="C类" width="50" prop="data14">
					
					</el-table-column>
			</el-table-column>
	    </el-table>
  	</div>
</template>
	</div>
</template>

<script>
	export default {
		name: 'ReportExcel',
		data() {
			return {
				name: "张三",
				zhiwu: "销售科科长",
				data: [
					{
						"data1": 1,
						"data2": 1,
						"data3": 1,
						"data4": 1,
						"data5": 1,
						"data6": 1,
						"data7": 1,
						"data8": 1,
						"data9": 1,
						"data10": 1,
						"data11": 1,
						"data12": 1,
						"data13": 1,
						"data14": 1
					},
					{
						"data1": 2,
						"data2": 1,
						"data3": 1,
						"data4": 1,
						"data5": 1,
						"data6": 1,
						"data7": 1,
						"data8": 1,
						"data9": 1,
						"data10": 1,
						"data11": 1,
						"data12": 1,
						"data13": 1,
						"data14": 1
					},
					{
						"data1": 3,
						"data2": 1,
						"data3": 1,
						"data4": 1,
						"data5": 1,
						"data6": 1,
						"data7": 1,
						"data8": 1,
						"data9": 1,
						"data10": 1,
						"data11": 1,
						"data12": 1,
						"data13": 1,
						"data14": 1
					},
					{
						"data1": 4,
						"data2": 1,
						"data3": 1,
						"data4": 1,
						"data5": 1,
						"data6": 1,
						"data7": 1,
						"data8": 1,
						"data9": 1,
						"data10": 1,
						"data11": 1,
						"data12": 1,
						"data13": 1,
						"data14": 1
					},
					{
						"data1": 5,
						"data2": 1,
						"data3": 1,
						"data4": 1,
						"data5": 1,
						"data6": 1,
						"data7": 1,
						"data8": 1,
						"data9": 1,
						"data10": 1,
						"data11": 1,
						"data12": 1,
						"data13": 1,
						"data14": 1
					},
					{
						"data1": 6,
						"data2": 1,
						"data3": 1,
						"data4": 1,
						"data5": 1,
						"data6": 1,
						"data7": 1,
						"data8": 1,
						"data9": 1,
						"data10": 1,
						"data11": 1,
						"data12": 1,
						"data13": 1,
						"data14": 1
					},
					{
						"data1": 7,
						"data2": 1,
						"data3": 1,
						"data4": 1,
						"data5": 1,
						"data6": 1,
						"data7": 1,
						"data8": 1,
						"data9": 1,
						"data10": 1,
						"data11": 1,
						"data12": 1,
						"data13": 1,
						"data14": 1
					},
					{
						"data1": 8,
						"data2": 1,
						"data3": 1,
						"data4": 1,
						"data5": 1,
						"data6": 1,
						"data7": 1,
						"data8": 1,
						"data9": 1,
						"data10": 1,
						"data11": 1,
						"data12": 1,
						"data13": 1,
						"data14": 1
					},
					{
						"data1": 9,
						"data2": 1,
						"data3": 1,
						"data4": 1,
						"data5": 1,
						"data6": 1,
						"data7": 1,
						"data8": 1,
						"data9": 1,
						"data10": 1,
						"data11": 1,
						"data12": 1,
						"data13": 1,
						"data14": 1
					},
					{
						"data1": 10,
						"data2": 1,
						"data3": 1,
						"data4": 1,
						"data5": 1,
						"data6": 1,
						"data7": 1,
						"data8": 1,
						"data9": 1,
						"data10": 1,
						"data11": 1,
						"data12": 1,
						"data13": 1,
						"data14": 1
					},
					{
						"data1": 11,
						"data2": 1,
						"data3": 1,
						"data4": 1,
						"data5": 1,
						"data6": 1,
						"data7": 1,
						"data8": 1,
						"data9": 1,
						"data10": 1,
						"data11": 1,
						"data12": 1,
						"data13": 1,
						"data14": 1
					},
					{
						"data1": 12,
						"data2": "100万",
						"data3": "80万",
						"data4": "80%",
						"data5": "90万",
						"data6": 1456,
						"data7": 1322,
						"data8": "92.3%",
						"data9": 1322,
						"data10": "80%",
						"data11": 1566,
						"data12": 333,
						"data13": 478,
						"data14": 575
					}
				]
			}
		},
		methods: {
			handleDownload() {
		      this.downloadLoading = true
		        import('@/vendor/Export2Excel').then(excel => {
		          const multiHeader = [['Id', 'Main Information', '', '', 'Date']]
		          const header1 = ['', 'Title', 'Author', 'Readings', '']
		          const header2 = []
		          const filterVal = ['id', 'title', 'author', 'pageviews', 'display_time']
		          const data = that.data
		          const Jsondata = this.formatJson(filterVal, data)
		          const merges = ['A1:A2', 'B1:D1', 'E1:E2']
		          excel.export_json_to_excel({
		            multiHeader,
		            header1,
		            header2,
		            merges,
		            Jsondata
		          })
		          this.downloadLoading = false
		        })
		    },
		    handlePrint() {
		    	this.$print(this.$refs.multipleTable)
		    }
		}
	}
</script>