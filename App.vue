<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "animate.css";
	@import "uview-ui/index.scss";
	@import "common/css/index.css";
	body{
		background:rgba(248,248,248,1);
	}
	.l-my-flex,.l-my-flex-bw,.l-my-flex-start{
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
	}
	.l-my-flex-bw{
		justify-content:space-between;
	}
	.l-my-flex-center{
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.l-my-flex-start{
		justify-content:flex-start;
	}
	.dis{
		display: flex;
	}
	.cl{
		flex-direction: column;
	}
	.al_c{
		align-items: center;
	}	
	.j_c{
		justify-content: center;
	}
	.aro{
		justify-content: space-around;
	}
</style>
