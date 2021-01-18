/* =
    jquery.eventCalendar.js
    version: 0.7
    date: 13-08-2015
    author:
        Jaime Fernandez (@vissit)
    company:
        Paradigma Tecnologico (@paradigmate)
    url:
   		http://www.vissit.com/projects/eventCalendar/
*/
var baseURL = $("#base-url-1").val();
;(function( $ ) {
	$.fn.eventCalendar = function(options){
		var calendar = this;

		if ( options.locales && typeof(options.locales) == 'string' ) {
			$.getJSON(options.locales, function(data) {
				options.locales = $.extend({}, $.fn.eventCalendar.defaults.locales, data);
				moment.locale(data.locale, options.locales.moment);
				moment.locale(data.locale);

				initEventCalendar(calendar, options);
			}).error(function() {
				showError("error getting locale json", $(this));
			});
		} else {
			if ( options.locales && options.locales.locale ) {
				options.locales = $.extend({}, $.fn.eventCalendar.defaults.locales, options.locales);
				moment.locale(options.locales.locale, options.locales.moment);
				moment.locale(options.locales.locale);
			}
			initEventCalendar(calendar, options);
		}


	};


	// define the parameters with the default values of the function
	$.fn.eventCalendar.defaults = {
	    eventsjson: 'js/events.json',
		//eventsLimit: 10,
		locales: {
			locale: "en",
			txt_noEvents: "No Projects With Closing Date in this period",
			txt_SpecificEvents_prev: "Projects With Closing Date in ",
			txt_SpecificEvents_after: "",
			txt_next: "next",
			txt_prev: "prev",
			txt_NextEvents: "Pending Projects",
			txt_GoToEventUrl: "Pending Projects",
			txt_loading: "loading..."
		},
		showDayAsWeeks: true,
		startWeekOnMonday: true,
		showDayNameInCalendar: true,
		showDescription: false,
		onlyOneDescription: true,
		openEventInNewWindow: true,
		eventsScrollable: false,
		dateFormat: "MM/D/YYYY",
		jsonDateFormat: 'timestamp', // you can use also "human" 'YYYY-MM-DD HH:MM:SS'
		moveSpeed: 500,	// speed of month move when you clic on a new date
		moveOpacity: 0.15, // month and events fadeOut to this opacity
		jsonData: "", 	// to load and inline json (not ajax calls)
		cacheJson: true	// if true plugin get a json only first time and after plugin filter events
						// if false plugin get a new json on each date change
	};

	function initEventCalendar(that, options) {
		var eventsOpts = $.extend({}, $.fn.eventCalendar.defaults, options);

		// define global vars for the function
		var flags = {
			wrap: "",
			directionLeftMove: "300",
			eventsJson: {}
		};

		// each eventCalendar will execute this function
		that.each(function(){

			flags.wrap = $(this);
			flags.wrap.addClass('eventCalendar-wrap').append("<!--div class='eventCalendar-list-wrap'><p class='eventCalendar-subtitle'></p><span class='eventCalendar-loading'>"+eventsOpts.locales.txt_loading+"</span><div class='eventCalendar-list-content'><div class='eventCalendar-list'></div></div></div-->");

			if (eventsOpts.eventsScrollable) {
				//flags.wrap.find('.eventCalendar-list-content').addClass('scrollable');
			}

			setCalendarWidth(flags);
			$(window).resize(function(){
				setCalendarWidth(flags);
			});
			//flags.directionLeftMove = flags.wrap.width();

			// show current month
			dateSlider("current", flags, eventsOpts);

			getEvents(flags, eventsOpts, eventsOpts.eventsLimit,false,false,false,false);

			changeMonth(flags, eventsOpts);

			flags.wrap.on('click','.eventCalendar-day a',function(e){
			//flags.wrap.find('.eventCalendar-day a').live('click',function(e){
				e.preventDefault();
				var year = flags.wrap.attr('data-current-year'),
					month = flags.wrap.attr('data-current-month'),
					day = $(this).parent().attr('rel');

				getEvents(flags, eventsOpts, false, year, month,day, "day");
			});
			flags.wrap.on('click','.eventCalendar-monthTitle', function(e){
			//flags.wrap.find('.eventCalendar-monthTitle').live('click',function(e){
				e.preventDefault();
				var year = flags.wrap.attr('data-current-year'),
					month = flags.wrap.attr('data-current-month');

				getEvents(flags, eventsOpts, eventsOpts.eventsLimit, year, month,false, "month");
			});
		});

		// show event description
		flags.wrap.find('.eventCalendar-list').on('click','.eventCalendar-eventTitle',function(e){
		//flags.wrap.find('.eventCalendar-list .eventCalendar-eventTitle').live('click',function(e){
			if(!eventsOpts.showDescription) {
				e.preventDefault();
				var desc = $(this).parent().find('.eventCalendar-eventDesc');

				if (!desc.find('a').size()) {
					var eventUrl = $(this).attr('href');
					var eventTarget = $(this).attr('target');

					// create a button to go to event url
					desc.append('<a href="' + eventUrl + '" target="'+eventTarget+'" class="bt">'+eventsOpts.locales.txt_GoToEventUrl+'</a>');
				}

				if ( desc.is(':visible') ) {
					desc.slideUp();
				} else {
					if(eventsOpts.onlyOneDescription) {
						flags.wrap.find('.eventCalendar-eventDesc').slideUp();
					}
					desc.slideDown();
				}

			}
		});

		$( "#Tab2" ).on('change','#month_sel', function(e){
			e.preventDefault();
			var year = $('#year_sel').val(),
				month = $(this).val();
			var pre_month = flags.wrap.attr('data-current-month');
			//console.log(month);
			blackbox_update(month,year);
			//getEvents(flags, eventsOpts, eventsOpts.eventsLimit, year, month,false, "month");
			var month2 = parseInt(month) + 1;
			if(month2<9){
				month2 = '0'+month2;
			}

			$(".excel_link").attr("href",baseURL+'76rqJ7/admin/download_closing_report/'+month2+'/'+year);

			var lastMonthMove;

			pre_month = parseInt(pre_month);
			month = parseInt(month);

			if (pre_month<month) {
				for (var x = pre_month; x < month; x++) {
					dateSlider("next", flags, eventsOpts);
					lastMonthMove = '-=' + flags.directionLeftMove;
				}
			} else {
				for (var y = pre_month; y > month; y--) {
					dateSlider("prev", flags, eventsOpts);
					lastMonthMove = '+=' + flags.directionLeftMove;
				}
			}

			flags.wrap.find('.eventCalendar-monthWrap.eventCalendar-oldMonth').animate({
				opacity: eventsOpts.moveOpacity,
				left: lastMonthMove
			}, eventsOpts.moveSpeed, function() {
				flags.wrap.find('.eventCalendar-monthWrap.eventCalendar-oldMonth').remove();
			});

		});

		$( "#Tab2" ).on('change','#year_sel', function(e){
			e.preventDefault();
			var year = $(this).val(),
				month = $('#month_sel').val();
				blackbox_update(month,year);
			var pre_month = flags.wrap.attr('data-current-month');
			$('#eventCalendarDefault').attr('data-current-year',year);
			//getEvents(flags, eventsOpts, eventsOpts.eventsLimit, year, month,false, "month");

			var month2 = parseInt(month) + 1;
			if(month2<9){
				month2 = '0'+month2;
			}

			$(".excel_link").attr("href",baseURL+'76rqJ7/admin/download_closing_report/'+month2+'/'+year);

			var lastMonthMove;

			if (pre_month<month) {
				dateSlider("year", flags, eventsOpts);
				lastMonthMove = '-=' + flags.directionLeftMove;
			} else {
				dateSlider("year", flags, eventsOpts);
				lastMonthMove = '+=' + flags.directionLeftMove;
			}

			flags.wrap.find('.eventCalendar-monthWrap.eventCalendar-oldMonth').animate({
				opacity: eventsOpts.moveOpacity,
				left: lastMonthMove
			}, eventsOpts.moveSpeed, function() {
				flags.wrap.find('.eventCalendar-monthWrap.eventCalendar-oldMonth').remove();
			});
		});

		$( "#Tab2" ).on('click','#search_btn', function(e){
			e.preventDefault();
			var year = flags.wrap.attr('data-current-year'),
				month = flags.wrap.attr('data-current-month');

			getEvents(flags, eventsOpts, eventsOpts.eventsLimit, year, month,false, "month");
        });

        $( "#Tab2" ).on('click','#clear_search', function(e){
			e.preventDefault();
			$('#search_text').val('');
			var year = flags.wrap.attr('data-current-year'),
				month = flags.wrap.attr('data-current-month');

			getEvents(flags, eventsOpts, eventsOpts.eventsLimit, year, month,false, "month");
        });

	}

	function sortJson(a, b){
		if ( typeof a.date === 'string' ) {
			return a.date.toLowerCase() > b.date.toLowerCase() ? 1 : -1;
		}
		return a.date > b.date ? 1 : -1;
	}

	function dateSlider(show, flags, eventsOpts) { 
		var $eventsCalendarSlider = $("<div class='eventCalendar-slider'></div>"),
			$eventsCalendarMonthWrap = $("<div class='eventCalendar-monthWrap'></div>"),
			//$eventsCalendarTitle = $("<div class='eventCalendar-currentTitle'><a href='#' class='eventCalendar-monthTitle'></a></div>"),
			//$eventsCalendarArrows = $("<a href='#' class='eventCalendar-arrow eventCalendar-prev'><span>" + eventsOpts.locales.txt_prev + "</span></a><a href='#' class='eventCalendar-arrow eventCalendar-next'><span>" + eventsOpts.locales.txt_next + "</span></a>");
			$eventsCalendarTitle = "";
			$eventsCalendarArrows = "";
			$eventsCalendarDaysList = $("<ul class='eventCalendar-daysList'></ul>"),
			date = new Date();

		if ( !flags.wrap.find('.eventCalendar-slider').length ) {
			flags.wrap.prepend($eventsCalendarSlider);
			$eventsCalendarSlider.append($eventsCalendarMonthWrap);
		} else {
			flags.wrap.find('.eventCalendar-slider').append($eventsCalendarMonthWrap);
		}

		flags.wrap.find('.eventCalendar-monthWrap.eventCalendar-currentMonth').removeClass('eventCalendar-currentMonth').addClass('eventCalendar-oldMonth');
		$eventsCalendarMonthWrap.addClass('eventCalendar-currentMonth').append($eventsCalendarTitle, $eventsCalendarDaysList);



		// if current show current month & day
		if (show === "current") {
			day = date.getDate();
			$eventsCalendarSlider.append($eventsCalendarArrows);

		} else if (show === "year") {
			date = new Date(flags.wrap.attr('data-current-year'),flags.wrap.attr('data-current-month'),1,0,0,0); // current visible month
			day = 0; // not show current day in days list

			date.setMonth( date.getMonth() );

			var tmpDate = new Date();
			if (date.getMonth() === tmpDate.getMonth()) {
				day = tmpDate.getDate();
			}

		} else {
			date = new Date(flags.wrap.attr('data-current-year'),flags.wrap.attr('data-current-month'),1,0,0,0); // current visible month
			day = 0; // not show current day in days list

			moveOfMonth = 1;
			if (show === "prev") {
				moveOfMonth = -1;
			}
			date.setMonth( date.getMonth() + moveOfMonth );

			var tmpDate = new Date();
			if (date.getMonth() === tmpDate.getMonth()) {
				day = tmpDate.getDate();
			}

		}

		// get date portions
		var year = date.getFullYear(), // year of the events
			currentYear = new Date().getFullYear(), // current year
			month = date.getMonth(), // 0-11
			monthToShow = month + 1;

		if (show != "current") {
			// month change
			getEvents(flags, eventsOpts, eventsOpts.eventsLimit, year, month,false, show);
		}

		flags.wrap.attr('data-current-month',month)
			.attr('data-current-year',year);

		// add current date info
		moment.locale(eventsOpts.locales.locale);

		var formatedDate = moment(year+" "+monthToShow, "YYYY MM").format("MMMM YYYY");
		//$eventsCalendarTitle.find('.eventCalendar-monthTitle').html(formatedDate);

		// print all month days
		var daysOnTheMonth = 32 - new Date(year, month, 32).getDate();
		var daysList = [],
			i;
		if (eventsOpts.showDayAsWeeks) {
			$eventsCalendarDaysList.addClass('eventCalendar-showAsWeek');

			// show day name in top of calendar
			if (eventsOpts.showDayNameInCalendar) {
				$eventsCalendarDaysList.addClass('eventCalendar-showDayNames');

				i = 0;
				// if week start on monday
				if (eventsOpts.startWeekOnMonday) {
					i = 1;
				}

				for (; i < 7; i++) {
					daysList.push('<li class="eventCalendar-day-header">'+moment()._locale._weekdaysShort[i]+'</li>');

					if (i === 6 && eventsOpts.startWeekOnMonday) {
						// print sunday header
						daysList.push('<li class="eventCalendar-day-header">'+moment()._locale._weekdaysShort[0]+'</li>');
					}

				}
			}

			dt=new Date(year, month, 01);
			var weekDay = dt.getDay(); // day of the week where month starts

			if (eventsOpts.startWeekOnMonday) {
				weekDay = dt.getDay() - 1;
			}
			if (weekDay < 0) { weekDay = 6; } // if -1 is because day starts on sunday(0) and week starts on monday

			for (i = weekDay; i > 0; i--) {
				daysList.push('<li class="eventCalendar-day eventCalendar-empty"></li>');
			}
		}
		for (dayCount = 1; dayCount <= daysOnTheMonth; dayCount++) {
			var dayClass = "";

			if (day > 0 && dayCount === day && year === currentYear) {
				dayClass = "today";
			}
			daysList.push('<li id="dayList_' + dayCount + '" rel="'+dayCount+'" class="eventCalendar-day '+dayClass+'"><a href="#">' + dayCount + '</a></li>');
		}
		$eventsCalendarDaysList.append(daysList.join(''));

		$eventsCalendarSlider.css('height',$eventsCalendarMonthWrap.height()+'px');
	}

	function getEvents(flags, eventsOpts, limit, year, month, day, direction) {
		limit = limit || 0;
		year = year || '';
		day = day || '';

		// to avoid problem with january (month = 0)

		if (typeof month != 'undefined') {
			month = month;
		} else {
			month = '';
		}

		//var month = month || '';
		flags.wrap.find('.eventCalendar-loading').fadeIn();
		ShwLoadingPanel();

		if (eventsOpts.jsonData) { 
			// user send a json in the plugin params
			eventsOpts.cacheJson = true;

			flags.eventsJson = eventsOpts.jsonData;
			getEventsData(flags, eventsOpts, flags.eventsJson, limit, year, month, day, direction);

		} else if (!eventsOpts.cacheJson || !direction) { 
			// first load: load json and save it to future filters
			$.getJSON(eventsOpts.eventsjson + "?limit="+limit+"&year="+year+"&month="+month+"&day="+day, function(data) {
				flags.eventsJson = data; // save data to future filters
				year = flags.wrap.attr('data-current-year'), 
				month = flags.wrap.attr('data-current-month');
				getEventsData(flags, eventsOpts, flags.eventsJson, limit, year, month, day, direction);
			}).error(function() {
				showError("error getting json: ", flags.wrap);
			});
		} else { 
			// filter previus saved json
			getEventsData(flags, eventsOpts, flags.eventsJson, limit, year, month, day, direction);
		}

		if (day > '') {
			flags.wrap.find('.eventCalendar-current').removeClass('eventCalendar-current');
			flags.wrap.find('#dayList_'+day).addClass('eventCalendar-current');
		}
	}

	function getEventsData(flags, eventsOpts, data, limit, year, month, day, direction){
		directionLeftMove = "-=" + flags.directionLeftMove;
		eventContentHeight = "auto";

		subtitle = flags.wrap.find('.eventCalendar-list-wrap .eventCalendar-subtitle');

		if ( !direction ) {
			// first load
			subtitle.html(eventsOpts.locales.txt_NextEvents);
			eventContentHeight = "auto";
			directionLeftMove = "-=0";
		} else {
			var jsMonth = parseInt(month) + 1,
				formatedDate;
			moment.locale(eventsOpts.locales.locale);

			if (day !== '') {
				formatedDate = moment(year+" "+jsMonth+" "+day, "YYYY MM DD").format("LL");
				subtitle.html(eventsOpts.locales.txt_SpecificEvents_prev + formatedDate + " " + eventsOpts.locales.txt_SpecificEvents_after);
				//eventStringDate = moment(eventDate).format(eventsOpts.dateFormat);
			} else {
				formatedDate = moment(year+" "+jsMonth, "YYYY MM").format("MMMM");
				subtitle.html(eventsOpts.locales.txt_SpecificEvents_prev + formatedDate + " " + eventsOpts.locales.txt_SpecificEvents_after);
			}

			if (direction === 'eventCalendar-prev') {
				directionLeftMove = "+=" + flags.directionLeftMove;
			} else if (direction === 'day' || direction === 'month') {
				directionLeftMove = "+=0";
				eventContentHeight = 0;
			}
		}

		$('#loan_closing_calendar').animate({
			opacity: eventsOpts.moveOpacity,
			left: directionLeftMove,
			//height: eventContentHeight
		}, eventsOpts.moveSpeed, function() {
			//$('#loan_closing_calendar').css({'left':0, 'height': 'auto'}).hide();
			//wrap.find('.eventCalendar-list li').fadeIn();
			if (data.length) {
				//var search_text = data[0]['search_text'];
				var search_text = $('#search_text').val();
			}else{
				var search_text = "";
			}

			var events = [];
			//events.push('<div class="filter-bar"><form name="search_form" id="search_form" method="post" action=""><input type="hidden" name="csrf_test_name" value="'+global_csrf_token_value+'"><div><div><label>Project Name : </label><div class="input-append"><input type="text" name="search_text" id="search_text" class="input-xlarge" value="'+search_text+'" placeholder="Search " ></div></div><button type="submit" id="search" name="search" class="btn btn-primary ">Search</button><button type="submit" id="search1" name="clr" class="btn btn-primary">Reset</button></div></form><div style="float:right"><a class="download_closing_project" data-month="'+month+'" data-year="'+year+'" href="'+baseURL+'76rqJ7/admin/download_closing_report/'+month+'/'+year+'/'+search_text+'">Export to Excel</a></div></div>');
			//events.push('<table id="LoanClosingCalendar" class="table table-bordered Loan-closing-calendar loanGenerate_list table-striped role-table thead-bg m-t-10 dataTable no-footer table-hover" ><thead><tr><th>#</th><th>Street Address</th><th>City</th><th>State</th><th>Disbursed at Closing</th><th>Interest Reserve</th><th>Escrow Hold Back</th><th>Total Loan Amount</th><th>Origination Fee</th><th>Interest Rate</th><th>Origination Entity</th><th style="width:11%;">Broker</th><th style="width:11%;">Title Company</th><th>Bank Attorney</th><th>Project Status</th><th>Closing Date</th></tr></thead><tbody>');
            events.push('<table id="LoanClosingCalendar" class="table table-bordered Loan-closing-calendar loanGenerate_list table-striped role-table thead-bg m-t-10 dataTable no-footer table-hover" ><thead><tr><th>#</th><th>Street Address</th><th>Disbursed at Closing</th><th>Interest Reserve</th><th>Escrow Hold Back</th><th>Total Loan Amount</th><th>Origination Fee</th><th>Interest Rate</th><th>Origination Entity</th><th style="width:11%;">Broker</th><th style="width:11%;">Title Company</th><th>Settlement Agent</th><th>Bank Attorney</th><th>Project Status</th><th>Closing Date</th></tr></thead><tbody>');
			data = $(data).sort(sortJson); // sort event by dates

			// each event
			if ( data.length ) {

				// show or hide event description
				var eventDescClass = '';
				if(!eventsOpts.showDescription) {
					eventDescClass = 'eventCalendar-hidden';
				}
				var eventLinkTarget = "_self";
				if(eventsOpts.openEventInNewWindow) {
					eventLinkTarget = '_blank';
				}

				var i = 0;
				var heading = [];
				var totalamount_bridge = 0;
				var totalamount_term = 0;
				var totalamount = 0;
				var totalamountClosed_bridge = 0;
				var totalamountClosed_term = 0;
				var totalamountClosed = 0;
				var totalcountClosed = 0;
				var totalcount = 0;
				var sumdis_bridge = 0;
				var sumdis_term = 0;
				var sumdis = 0;
				var escrow_total_bridge = 0;
				var escrow_total_term = 0;
				var escrow_total = 0;
				var loan_amt_bridge = 0;
				var loan_amt_term = 0;
				var loan_amt = 0;
				var total_origination_bridge =0;
				var total_origination_term =0;
				var total_origination =0;
				var org_perc;
				var tooltipdiv;
				var ir_total_amt_bridge = 0;
				var ir_total_amt_term = 0;
				var ir_total_amt = 0;
				var slno = 1;

				$.each(data, function(key, event) {
					var eventDateTime, eventDate, eventTime, eventYear, eventMonth, eventDay,
						eventMonthToShow, eventHour, eventMinute, eventSeconds;
					if (eventsOpts.jsonDateFormat == 'human') {
						eventDateTime = event.date.split(" ");
						eventDate = eventDateTime[0].split("-");
						eventTime = eventDateTime[1].split(":");
						eventYear = eventDate[0];
						eventMonth = parseInt(eventDate[1]) - 1;
						eventDay = parseInt(eventDate[2]);
						//eventMonthToShow = eventMonth;
						eventMonthToShow = parseInt(eventMonth) + 1;
						eventHour = eventTime[0];
						eventMinute = eventTime[1];
						eventSeconds = eventTime[2];
						eventDate = new Date(eventYear, eventMonth, eventDay, eventHour, eventMinute, eventSeconds);
					} else {
						eventDate = new Date(parseInt(event.date));
						eventYear = eventDate.getFullYear();
						eventMonth = eventDate.getMonth();
						eventDay = eventDate.getDate();
						eventMonthToShow = eventMonth + 1;
						eventHour = eventDate.getHours();
						eventMinute = eventDate.getMinutes();

					}

					if (parseInt(eventMinute) <= 10) {
						eventMinute = "0" + parseInt(eventMinute);
					}


					if (limit === 0 || limit > i) {

						// if month or day exist then only show matched events
						if ((month === false || month == eventMonth) && (day === '' || day == eventDay) && (year === '' || year == eventYear) ) {
								
								// if initial load then load only future events
								if (month === false && eventDate < new Date()) {
								} else {
									// search text box
									if(search_text === '' || event.title.toLowerCase().indexOf(search_text.toLowerCase()) != -1){

										if(event.main_status !='AJ'){

											moment.locale(eventsOpts.locales.locale);
											//eventStringDate = eventDay + "/" + eventMonthToShow + "/" + eventYear;
											eventStringDate = moment(eventDate).format(eventsOpts.dateFormat);
											var eventTitle;

											if (event.url) {
												eventTitle = '<a href="'+event.url+'" target="' + eventLinkTarget + '" data-toggle="tooltip" data-placement="right" data-html="true" title="Closing Date: '+event.pclose_date+'</br>Closing Time: '+event.closetime+'</br>Project Location: '+event.project_location+'" data-type="warning">' + event.title + '</a>';
											} else {
												eventTitle = '<a href="#" data-toggle="tooltip" data-placement="right" data-html="true" title="Closing Date: '+event.pclose_date+'</br>Closing Time: '+event.closetime+'</br>Project Location: '+event.project_location+'" data-type="warning">'+event.title+'</a>';
											}

											var dis;
											var color;
											if(event.disbursed_amt==0){
											 	event.disbursed_amt = '';
											}
											if(event.escrow==''){
											 	event.escrow = '$0.00';
											}
											if(event.closed_status=='N'){
											 	if(event.same_data=='Y'){
											 		dis="checked='checked' disabled";
											 	}else{
											 		dis="";
											 	}
											}else{
											 	dis="checked='checked' disabled";
											}

											if(event.project_status=='C'){
											 	totalamountClosed += Number(event.totalamount);
											 	if(event.project_estimated_term =='360'){
											 		totalamountClosed_term += Number(event.totalamount);
											 	} else {
											 		totalamountClosed_bridge += Number(event.totalamount);
											 	}
											 	totalcountClosed  += 1;
											 	color = '<i class="fa fa-circle color-success bgc-success"></i>';
											}else{
											 	totalamountClosed += 0;
											 	totalamountClosed_term += 0;
											 	totalamountClosed_bridge += 0;
											 	totalcountClosed  += 0;
											 	color = '';
											}

											events.push('<tr id="del_'+event.project_id+'"><td>'+slno+'</td><td><div class="d-flex justify-content-between align-items-center status">'+eventTitle+' '+color+'</div></td><td style="text-align:right;"><span data-toggle="tooltip" data-placement="right" title="'+event.percentage+'">'+event.disbursed_amt+'</span></td><td style="text-align:right;"><span data-toggle="tooltip" data-placement="right" title="'+event.interest_reserve_month+' month(s) of interest">'+event.interest_reserve+'</span></td><td style="text-align:right;">'+event.escrow+'</td><td style="text-align:right;">'+event.total_loan+'</td><td>'+event.origination_fee+'</td><td>'+event.interest+'</td><td>'+event.entity_org+'</td><td>'+event.broker+'</td><td>'+event.title_company+'</td><td>'+event.agent+'</td><td>'+event.attorney+'</td><td>'+event.project_status+'</td><td>'+eventStringDate+'</td></tr>');

											//events.push('<tr id="del_'+event.project_id+'"><td>'+slno+'</td><td><div class="d-flex justify-content-between align-items-center status">'+eventTitle+' '+color+'</div></td><td>'+event.city+'</td><td>'+event.state+'</td><td style="text-align:right;"><span data-toggle="tooltip" data-placement="right" title="'+event.percentage+'">'+event.disbursed_amt+'</span></td><td style="text-align:right;"><span data-toggle="tooltip" data-placement="right" title="'+event.interest_reserve_month+' month(s) of interest">'+event.interest_reserve+'</span></td><td style="text-align:right;">'+event.escrow+'</td><td style="text-align:right;">'+event.total_loan+'</td><td>'+event.origination_fee+'</td><td>'+event.interest+'</td><td>'+event.entity_org+'</td><td>'+event.broker+'</td><td>'+event.title_company+'</td><td>'+event.attorney+'</td><td>'+event.project_status+'</td><td>'+eventStringDate+'</td></tr>');

											totalcount  += 1;
											totalamount += Number(event.totalamount);
											if(event.project_estimated_term =='360'){
		                                    	totalamount_term += Number(event.totalamount);
											 		console.log('T');
		                                    } else {
		                                    	totalamount_bridge += Number(event.totalamount);
											 		console.log('B');

		                                    }
											if(event.disbursed_amt!=''){
			                                 	sumdis +=  parseFloat(event.disbursed_amt.replace(/[^0-9-.]/g, ''));
			                                 	if(event.project_estimated_term =='360'){
			                                    	sumdis_term += parseFloat(event.disbursed_amt.replace(/[^0-9-.]/g, ''));
			                                    } else {
			                                    	sumdis_bridge += parseFloat(event.disbursed_amt.replace(/[^0-9-.]/g, ''));
			                                    }
			                                }
			                                if(event.escrow!=''){
			                                    escrow_total += parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
			                                    if(event.project_estimated_term =='360'){
			                                    	escrow_total_term += parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
			                                    } else {
			                                    	escrow_total_bridge += parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
			                                    }
			                                }
			                                if(event.interest_reserve!=''){
			                                    ir_total_amt += parseFloat(event.interest_reserve.replace(/[^0-9-.]/g, ''));
			                                    if(event.project_estimated_term =='360'){
			                                    	ir_total_amt_term += parseFloat(event.interest_reserve.replace(/[^0-9-.]/g, ''));
			                                    } else {
			                                    	ir_total_amt_bridge += parseFloat(event.interest_reserve.replace(/[^0-9-.]/g, ''));
			                                    }
			                                }
			                                if(event.total_loan!=''){
												loan_amt += parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
												if(event.project_estimated_term =='360'){
			                                    	loan_amt_term += parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
			                                    } else {
			                                    	loan_amt_bridge += parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
			                                    }
			                                }
			                                if(event.origination_fee!="" && event.total_loan!=''){
			                                 	org_perc = parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''))*(event.org_fee/100);
			                                 	total_origination +=parseFloat(org_perc);

			                                 	if(event.project_estimated_term =='360'){
			                                    	org_perc_term = parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''))*(event.org_fee/100);
			                                 		total_origination_term +=parseFloat(org_perc_term);
			                                    } else {

			                                 		org_perc_bridge = parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''))*(event.org_fee/100);
			                                 		total_origination_bridge +=parseFloat(org_perc_bridge);
			                                    }

			                                }

											slno++;

											//events.push('<li id="' + key + '" class="'+event.type+'"><time datetime="'+eventDate+'"><em>' + eventStringDate + '</em><small>'+eventHour+":"+eventMinute+'</small></time>'+eventTitle+'<p class="eventCalendar-eventDesc ' + eventDescClass + '">' + event.description + '</p></li>');
											i++;
										}
									}
								}
						}
					}

					// add mark in the dayList to the days with events
					if (eventYear == flags.wrap.attr('data-current-year') && eventMonth == flags.wrap.attr('data-current-month')) {
						flags.wrap.find('.eventCalendar-currentMonth .eventCalendar-daysList #dayList_' + parseInt(eventDay)).addClass('eventCalendar-dayWithEvents');
					}


				});
				
				events.push('</tbody><tfoot><tr><td colspan="2" style="text-align:right;"><b>Bridge Loans</b></td><td style="text-align:right;"><b> $'+number_format(sumdis_bridge,2)+'</b></td><td style="text-align:right;"><b>$'+number_format(ir_total_amt_bridge,2)+'</b><td style="text-align:right;"><b>$'+number_format(escrow_total_bridge,2)+'</b></td><td style="text-align:right;" class="tooltiptd" ><b>$'+number_format(loan_amt_bridge,2)+'</b><div class="tool-tip-div-tot" style="display:none;"><p>Total number of projects expected to close: '+totalcount+' </p><p>Total loan volume expected to close: $'+number_format(totalamount_bridge,2)+' </p><p>Total number of projects closed: '+totalcountClosed+'</p><p>Total loan volume closed: $'+number_format(totalamountClosed_bridge,2)+' </p></div></td><td><b>$'+number_format(total_origination_bridge,2)+'</b></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>             <tr><td colspan="2" style="text-align:right;"><b>Term Loans</b></td><td style="text-align:right;"><b> $'+number_format(sumdis_term,2)+'</b></td><td style="text-align:right;"><b>$'+number_format(ir_total_amt_term,2)+'</b><td style="text-align:right;"><b>$'+number_format(escrow_total_term,2)+'</b></td><td style="text-align:right;" class="tooltiptd" ><b>$'+number_format(loan_amt_term,2)+'</b><div class="tool-tip-div-tot" style="display:none;"><p>Total number of projects expected to close: '+totalcount+' </p><p>Total loan volume expected to close: $'+number_format(totalamount_term,2)+' </p><p>Total number of projects closed: '+totalcountClosed+'</p><p>Total loan volume closed: $'+number_format(totalamountClosed_term,2)+' </p></div></td><td><b>$'+number_format(total_origination_term,2)+'</b></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>             <tr><td colspan="2" style="text-align:right;"><b>Total</b></td><td style="text-align:right;"><b> $'+number_format(sumdis,2)+'</b></td><td style="text-align:right;"><b>$'+number_format(ir_total_amt,2)+'</b><td style="text-align:right;"><b>$'+number_format(escrow_total,2)+'</b></td><td style="text-align:right;" class="tooltiptd" ><b>$'+number_format(loan_amt,2)+'</b><div class="tool-tip-div-tot" style="display:none;"><p>Total number of projects expected to close: '+totalcount+' </p><p>Total loan volume expected to close: $'+number_format(totalamount,2)+' </p><p>Total number of projects closed: '+totalcountClosed+'</p><p>Total loan volume closed: $'+number_format(totalamountClosed,2)+' </p></div></td><td><b>$'+number_format(total_origination,2)+'</b></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tfoot>');
				
			}
			events.push('</table>');

			// there is no events on this period
			if (!events.length) {
				events.push('<li class="eventCalendar-noEvents"><p>' + eventsOpts.locales.txt_noEvents + '</p></li>');
			}
			flags.wrap.find('.eventCalendar-loading').hide();
			remvLoadingPanel();

			$('#loan_closing_calendar')
				.html(events.join(''));

			$('#loan_closing_calendar').animate({
				opacity: 1,
				//height: "toggle"
			}, eventsOpts.moveSpeed);

			$('[data-toggle="tooltip"]').tooltip();

		});
		setCalendarWidth(flags);
		
	}

	function changeMonth(flags, eventsOpts) {
		flags.wrap.find('.eventCalendar-arrow').click(function(e){
			e.preventDefault();
			var lastMonthMove;

			if ($(this).hasClass('eventCalendar-next')) {
				dateSlider("next", flags, eventsOpts);
				lastMonthMove = '-=' + flags.directionLeftMove;

			} else {
				dateSlider("prev", flags, eventsOpts);
				lastMonthMove = '+=' + flags.directionLeftMove;
			}

			flags.wrap.find('.eventCalendar-monthWrap.eventCalendar-oldMonth').animate({
				opacity: eventsOpts.moveOpacity,
				left: lastMonthMove
			}, eventsOpts.moveSpeed, function() {
				flags.wrap.find('.eventCalendar-monthWrap.eventCalendar-oldMonth').remove();
			});
		});
	}

	function showError(msg, wrap) {
		wrap.find('.eventCalendar-list-wrap').html("<span class='eventCalendar-loading eventCalendar-error'>"+msg+"</span>");
	}

	function setCalendarWidth(flags){
		// resize calendar width on window resize
		flags.directionLeftMove = flags.wrap.width();
		flags.wrap.find('.eventCalendar-monthWrap').width(flags.wrap.width() + 'px');

		flags.wrap.find('.eventCalendar-list-wrap').width(flags.wrap.width() + 'px');

	}

	// change number to number format
	function number_format(number, decimals, dec_point, thousands_sep) {

	    number = (number + '').replace(/[^0-9+\-Ee.]/g, '');
	    var n = !isFinite(+number) ? 0 : +number,
	    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
	    sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
	    dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
	    s = '',
	    toFixedFix = function(n, prec) {
	        var k = Math.pow(10, prec);
	        return '' + Math.round(n * k) / k;
	    };
	        
	    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
	    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
	    if (s[0].length > 3) {
	        s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
	    }
	    if ((s[1] || '').length < prec) {
	        s[1] = s[1] || '';
	        s[1] += new Array(prec - s[1].length + 1).join('0');
	    }
	    return s.join(dec);
	}


})( jQuery );


var ShwPnl = false;
function ShwLoadingPanel()
{
	if(!ShwPnl)
  	{
		var lDPnl = jQuery(document.createElement('div'))
   		lDPnl.attr("id","loadingPnl");    
   		lDPnl.attr("class","animsition-loading");    
   		lDPnl.css("width",jQuery(window).width()+"px").css("height",jQuery(window).height()+"px").css("opacity",0);
   		lDPnl.css("background","url("+baseURL+"images/ajax-loader.gif) no-repeat center rgba(255, 255, 255, 0.4)").css("position","fixed").css("left","0px").css("top","0px").css("z-index","10000");
   		jQuery(lDPnl).appendTo("body");
   		lDPnl.fadeTo(550, 1);
   		ShwPnl = true;
  	}
  	else
  		jQuery("#loadingPnl").fadeIn(550);
}
        
function remvLoadingPanel()
{
  jQuery("#loadingPnl").fadeOut(100);
}

function blackbox_update(month,year){
   

   var post_data = {month:month,year:year};
       post_data[global_csrf_token_name]= global_csrf_token_value;
    $.ajax({

        type:'POST',
        dataType:'json',
        data:post_data,
        url:baseURL + 'dashboard/loan_closing_dashboard/blackbox_update',
        success:function(data){
          console.log(data);
            $('#total_loans_closed').html(data.total_loans_closed);
            $('#total_loans_closed_volume').html(data.total_amount_life_time);

            $('#purchase_loans_count').html(data.purchase_loans_count);
            $('#purchase_loans_volume').html(data.purchase_loans_volume);
            $('#purchase_loans_per').html(data.purchase_loans_per);
            $('#purchase_loans_width').css('width',data.purchase_loans_per);

            $('#refinance_loans_count').html(data.refinance_loans_count);
            $('#refinance_loans_volume').html(data.refinance_loans_volume);
            $('#refinance_loans_per').html(data.refinance_loans_per);
            $('#refinance_loans_width').css('width',data.refinance_loans_per);

            $('#ss_origination_count').html(data.ss_origination_count);
            $('#ss_origination_volume').html(data.ss_origination_volume);
            $('#broker_origin_count').html(data.broker_origin_count);
            $('#broker_origin_volume').html(data.broker_origin_volume);

             $("#sc_close_count").html(data.sc_close_count);
            $("#sc_close_volume").html(data.sc_close_volume);

            $("#tristate_volume").html(data.tristate_volume);
            // $("#sc_close_tristate_per").css('width',data.sc_close_tristate_per);

            // $("#sc_close_national_per").css('width',data.sc_close_national_per);
            $("#nat_volume").html(data.nat_volume);


            $("#res_count").html(data.res_count);
            $("#res_vol").html(data.res_volume);
            //console.log(data.res_volume);
            
            $("#mf_count").html(data.mf_count);
            $("#mf_vol").html(data.mf_volume);
            $("#mu_count").html(data.mu_count);
            $("#mu_vol").html(data.mu_volume);
            $("#cm_count").html(data.cm_count);
            $("#cm_vol").html(data.cm_volume);
            $("#oth_count").html(data.oth_count);
            $("#oth_vol").html(data.oth_volume);
            natinal_pie(data);
            tristate_pie(data);
        }

     })

}

function natinal_pie(data){

	 var nat_volume = data.nat_volume.replace('.00','');
        var nat_volume2 = nat_volume.replace(/[^0-9-.]/g, '');
        var labl = data.nat_label;
        var nat_per = parseInt(data.sc_close_national_per);
        var bal_per = 100 - nat_per;


        var tristate_volume = data.tristate_volume.replace('.00','');
        var tristate_volume2 = tristate_volume.replace(/[^0-9-.]/g, '');
        var tlabl = data.tristate_label;

        
       
      //  console.log(data);
        Highcharts.setOptions({
             colors: ['#b354d7', '#3d4a56']
        });
        chart = new Highcharts.Chart({
            chart: {
              renderTo: 'national_div',
              type: 'pie',
              marginRight:0,
              backgroundColor:'rgba(255, 255, 255, 0.0)',
              width: '100',
              height: '100',
              events: {
                load: function(event) {
                  var chart = this,
                    points = chart.series[0].points,
                    len = points.length,
                    total = 0,
                    i = 0;

                    for (; i < len; i++) {
                        total += points[i].y;
                    }

                    chart.setTitle({
                        text: '<span style="font-weight:bold; color:#8597b2; font-size:11px;">'+nat_per+'%</span>' + '<br><br>' + '',
                        align: 'center',
                        verticalAlign: 'middle',
                        y: 5,
                        x: 5,
                         style: {
                                    color: '#a7aab1',
                                    fontSize:'25px'
                                },
                    });
                    // $(chart.series[0].data).each(function (j, seriesitem) {
                    //        $('<div class="legend-item"><div class="legend-item-label" style="color:'+seriesitem.color+'"><span>'+ seriesitem.name +'</span> <span style="font-weight:bold;">' + this.y + '</span></div></div>').click(function () {
                    //         seriesitem.visible ? seriesitem.hide() : seriesitem.show();
                    //     }).appendTo('#items');
                    // });
                }
              }
            },
            tooltip: {
              formatter: function() {
                return '<b>' + this.point.name + '</b>';
              }
            },
            legend: {
              enabled: true,
              floating: false,
              borderWidth: 0,
              align: 'right',
              layout: 'vertical',
              verticalAlign: 'middle',
              itemMarginBottom: 2,
              useHTML: true,
              x:20,
              // labelFormatter: function() {
              //   return '<span style="font-family:Verdana, Geneva, sans-serif; font-size:14px; font-weight: normal;color:'+this.color+';">' + this.name + ' </span> <span style="font-weight: bold; font-size:14px; color:'+this.color+';">' + this.y + ' <br/></span>';
              // }
            },
            yAxis: {
              title: {
                text: ''
              }
            },
            plotOptions: {
              pie: {
                shadow: false,
                dataLabels: {
                    enabled: false,
                },
                width:'100%',
                innerSize: '90%',
                borderWidth: 0,
              }
            },
            credits:false,
            series: [{
                name:'Individual',
                data:[
                    {name: '$'+nat_volume2+labl, y: nat_per},
                    {name: '$'+tristate_volume2+tlabl, y: bal_per},
                   
                   
                ]
            }],
        });

  }



  function tristate_pie(data){
  	

       
       
        
       // var tristate_volume = data.tristate_volume;
        var tristate_volume = data.tristate_volume.replace('.00','');
        var tristate_volume2 = tristate_volume.replace(/[^0-9-.]/g, '');
        var labl = data.tristate_label;
        
        var sc_close_tristate_per = parseInt(data.sc_close_tristate_per);
        var bal_per = parseInt(100 - sc_close_tristate_per);
        var nat_volume = data.nat_volume.replace('.00','');
        var nat_volume2 = nat_volume.replace(/[^0-9-.]/g, '');
        var nlabl =  data.nat_label;

       
       
       
       
       
        Highcharts.setOptions({
            colors: ['#b354d7', '#3d4a56']
        });
        chart = new Highcharts.Chart({
            chart: {

              renderTo: 'tristatediv',
              type: 'pie',
              marginRight:0,
              backgroundColor:'rgba(255, 255, 255, 0.0)',
              width: '100',
              height: '100',
              events: {
                load: function(event) {
                    //console.log(chart.series[0].points);
                  var chart = this,
                    points = chart.series[0].points,
                    len = points.length,
                    total = 0,
                    i = 0;

                    for (; i < len; i++) {
                        total += points[i].y;
                    }

                    chart.setTitle({
                        text: '<span style="font-weight:bold; color:#8597b2; font-size:11px;">'+sc_close_tristate_per+'%</span>' + '<br><br>' + '',
                        align: 'center',
                        verticalAlign: 'middle',
                        y: 5,
                        x: 5,
                        style: {
                            color: '#a7aab1',
                            fontSize:'25px'
                        },
                    });
                    // $(chart.series[0].data).each(function (j, seriesitem) {
                    //        $('<div class="legend-item"><div class="legend-item-label" style="color:'+seriesitem.color+'"><span>'+ seriesitem.name +'</span> <span style="font-weight:bold;">' + this.y + '</span></div></div>').click(function () {
                    //         seriesitem.visible ? seriesitem.hide() : seriesitem.show();
                    //     }).appendTo('#items');
                    // });
                }
              }
            },
            tooltip: {
              formatter: function() {
                return '<b>' + this.point.name + '</b>';
              }
            },
            legend: {
              enabled: true,
              floating: false,
              borderWidth: 0,
              align: 'right',
              layout: 'vertical',
              verticalAlign: 'middle',
              itemMarginBottom: 2,
              useHTML: true,
              x:20,
              // labelFormatter: function() {
              //   return '<span style="font-family:Verdana, Geneva, sans-serif; font-size:14px; font-weight: normal;color:'+this.color+';">' + this.name + ' </span> <span style="font-weight: bold; font-size:14px; color:'+this.color+';">' + this.y + ' <br/></span>';
              // }
            },
            yAxis: {
              title: {
                text: ''
              }
            },
            plotOptions: {
              pie: {
                shadow: false,
                dataLabels: {
                    enabled: false,
                },
                width:'100%',
                innerSize: '90%',
                borderWidth: 0,
              }
            },
            credits:false,
            series: [{
                name:'Individual',
                data:[
                    {name: "$"+tristate_volume2+labl, y: sc_close_tristate_per},
                    {name: "$"+nat_volume+nlabl, y: bal_per}
                   
                ]
            }],
        });

        

    
  }