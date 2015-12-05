describe('Events', function() {
	beforeEach(function() {
		$('#fixture').remove();
		$('body').append('<div id="fixture"></div>');
		$('#fixture').html(
				'<div class="div_class" id="div-1" />'+
				'<div id="div-2">'+
				'	<div id="div-2-child">'+
				'		<div id="div-2-grandchild"><a id="link1" href="javascript:void(0)">Hello world</a></div>'+
				'   </div>'+
				'</div>'+
				'<div class="div_class" id="div-3" />');
	});

	it('registers event with a link in newest jQuery using on', function() {
		var clicked = false;
		$("#link1").on("click",null,function(e) {
			clicked = true;
		});


		$('#link1').trigger('click');

		expect(clicked).toBeTruthy();
	});

	it('registers event with a link in the older jQuery version using delegate', function() {
		var clicked = false;
		$("#div-2").delegate("#link1","click",function(e) {
			clicked = true;
		});

		$('#link1').trigger('click');
		expect(clicked).toBeTruthy();
	});

	it('makes sure delegated event is only triggered once', function() {
		var timesTriggered = 0;

/*		$('#div-2-grandchild').on('click','#link1',function(e) {
			timesTriggered++;
		});

		$('#div-2-grandchild').off('click','#link1',function(e) {
			timesTriggered++;
		});*/

		$('#div-2-grandchild').one('click','#link1',function(e) {
			timesTriggered++;
		});

		$('#link1').trigger('click');

		expect(timesTriggered).toEqual(1);
	});
});