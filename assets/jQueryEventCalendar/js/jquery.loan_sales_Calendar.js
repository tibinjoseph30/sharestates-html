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
var sale_loan_type = '';

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

		$( "#profile2" ).on('change','#month_sel', function(e){
			e.preventDefault();
			var year = $('#year_sel').val(),
				month = $(this).val();

			if(month == 0){
				var header_month = 'Janaury';
				var pie_month = 01;
			} else if(month == 1){
				var header_month = 'February';
				var pie_month = 02;
			} else if(month == 2){
				var header_month = 'March';
				var pie_month = 03;
			} else if(month == 3){
				var header_month = 'April';
				var pie_month = 04;
			} else if(month == 4){
				var header_month = 'May';
				var pie_month = 05;
			} else if(month == 5){
				var header_month = 'June';
				var pie_month = 06;
			} else if(month == 6){
				var header_month = 'July';
				var pie_month = 07;
			} else if(month == 7){
				var header_month = 'August';
				var pie_month = 08;
			} else if(month == 8){
				var header_month = 'September';
				var pie_month = 09;
			} else if(month == 9){
				var header_month = 'October';
				var pie_month = 10;
			} else if(month == 10){
				var header_month = 'November';
				var pie_month = 11;
			} else if(month == 11){
				var header_month = 'December';
				var pie_month = 12;
			}
			$('#header_month').html('<b>Projects With Loan Sale Date in '+header_month+'</b>');


			var pre_month = flags.wrap.attr('data-current-month');
			// getEvents(flags, eventsOpts, eventsOpts.eventsLimit, year, month,false, "month");

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

			get_total_info_term_pie(pie_month, year);

		});

		$( "#profile2" ).on('change','#year_sel', function(e){
			e.preventDefault();
			var year = $(this).val(),
				month = $('#month_sel').val();

			if(month == 0){
				var header_month = 'Janaury';
				var pie_month = 01;
			} else if(month == 1){
				var header_month = 'February';
				var pie_month = 02;
			} else if(month == 2){
				var header_month = 'March';
				var pie_month = 03;
			} else if(month == 3){
				var header_month = 'April';
				var pie_month = 04;
			} else if(month == 4){
				var header_month = 'May';
				var pie_month = 05;
			} else if(month == 5){
				var header_month = 'June';
				var pie_month = 06;
			} else if(month == 6){
				var header_month = 'July';
				var pie_month = 07;
			} else if(month == 7){
				var header_month = 'August';
				var pie_month = 08;
			} else if(month == 8){
				var header_month = 'September';
				var pie_month = 09;
			} else if(month == 9){
				var header_month = 'October';
				var pie_month = 10;
			} else if(month == 10){
				var header_month = 'November';
				var pie_month = 11;
			} else if(month == 11){
				var header_month = 'December';
				var pie_month = 12;
			}



			var pre_month = flags.wrap.attr('data-current-month');
			$('#eventCalendarDefault').attr('data-current-year',year);
			//getEvents(flags, eventsOpts, eventsOpts.eventsLimit, year, month,false, "month");

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

			get_total_info_term_pie(pie_month, year);
		});

		$( "#profile2" ).on('click','#search_btn', function(e){
			e.preventDefault();
			var year = flags.wrap.attr('data-current-year'),
				month = flags.wrap.attr('data-current-month');

			getEvents(flags, eventsOpts, eventsOpts.eventsLimit, year, month,false, "month");
        });

        $( "#profile2" ).on('click','#clear_search', function(e){
			e.preventDefault();
			$('#search_text').val('');
			sale_loan_type = '';
			var year = flags.wrap.attr('data-current-year'),
				month = flags.wrap.attr('data-current-month');

			getEvents(flags, eventsOpts, eventsOpts.eventsLimit, year, month,false, "month");
        });
        $( "#profile2" ).on('click','.sale_loan_type', function(e){
        	e.preventDefault();
        	sale_loan_type = '';
        	sale_loan_type = $(this).attr('rel');
        	var year = flags.wrap.attr('data-current-year'),
			month = flags.wrap.attr('data-current-month');
			getEvents(flags, eventsOpts, eventsOpts.eventsLimit, year, month,false, "month");
        });


		// $('select').selectpicker();
	}

	function sortJson(a, b){
		if ( typeof a.pdate === 'string' ) {
			return a.pdate.toLowerCase() > b.pdate.toLowerCase() ? 1 : -1;
		}
		return a.pdate > b.pdate ? 1 : -1;
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

		if (eventsOpts.jsonData) {
			// user send a json in the plugin params
			eventsOpts.cacheJson = true;

			flags.eventsJson = eventsOpts.jsonData;
			ShwLoadingPanel();
			getEventsData(flags, eventsOpts, flags.eventsJson, limit, year, month, day, direction);
			remvLoadingPanel();

		} else if (!eventsOpts.cacheJson || !direction) {
			// first load: load json and save it to future filters
			$.getJSON(eventsOpts.eventsjson + "?limit="+limit+"&year="+year+"&month="+month+"&day="+day, function(data) {
				flags.eventsJson = data; // save data to future filters
				year = flags.wrap.attr('data-current-year'), 
				month = flags.wrap.attr('data-current-month');
				ShwLoadingPanel();
				getEventsData(flags, eventsOpts, flags.eventsJson, limit, year, month, day, direction);
				remvLoadingPanel();
			}).error(function() {
				showError("error getting json: ", flags.wrap);
			});
		} else { 

			// filter previus saved json
			ShwLoadingPanel();
			getEventsData(flags, eventsOpts, flags.eventsJson, limit, year, month, day, direction);
			remvLoadingPanel();
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

		$('#loan_sales_calendar').animate({
			opacity: eventsOpts.moveOpacity,
			left: directionLeftMove,
			//height: eventContentHeight
		}, eventsOpts.moveSpeed, function() {
			//$('#loan_sales_calendar').css({'left':0, 'height': 'auto'}).hide();
			//wrap.find('.eventCalendar-list li').fadeIn();
			if (data.length) {
				var search_text = $('#search_text').val();
			}else{
				var search_text = "";
				sale_loan_type = '';
			}

			var events = [];
			var events1 = [];
			var eventsTotal=[];
			var total_loan_num = [];
			var escrow_summary = [];
			var loan_amt_summary = [];
			var dis_amt_summary = [];
			var link_summary = [];
			var sum_dis;
			

			events.push('<table id="loanGenerateList" class="table table-bordered loanGenerate_list table-striped role-table m-t-10 dataTable no-footer table-hover ds_allonge" data-page-size="10"><thead><tr><th style="display:none;"></th><th>Loan Address<span class="ml-2"></span></th><th>City<span class="ml-2"></span></th><th>State<span  class="ml-2"></span></th><th>Zip<span class="ml-2"></span></th><th>Total Loan Amount<span class="ml-2"></span></th><th>Interest Rate<span class="ml-2"></span></th><th>Borrower Funding Date<span class="ml-2"></span></th><th>Days Elapsed<span class="ml-2"></span></th><th>Allocation<span class="ml-2"></span></th><th>Docs</th><th>Loan Status</th><th>Days Elapsed<span class="ml-2"></span></th><th>Notes</th><th>Line</th><th>Assignment/Allonge</th><th>Appraisal/DS</th></tr></thead><tbody>');
            
			// data = $(data).sort(sortJson); // sort event by dates

			// each event
			if ( data.length ) {

				// show or hide event description
				var eventDescClass = '';
				if(!eventsOpts.showDescription) {
					eventDescClass = 'eventCalendar-hidden';
				}
				var eventLinkTarget = "_self";
				if(eventsOpts.openEventInNewWindow) {
					eventLinkTarget = '_target';
				}

				var i = 0;
				var heading = [];
				var totalamount = 0;
				var escrow_total = 0;
				var loan_amt = 0;
				var tooltipdiv;
				var slno = 1;
				var a=b=c=0;
				
				var un_allocated_amt = data[data.length-1]['un_allocated_amt']['un_allocated_amt'];
				var total_unsold_loans = data.length;
				$("#unsold_loan").html(total_unsold_loans);
				var un_allocated = data[data.length-1]['un_allocated']['un_allocated'];
				$("#un_allocated_loans").html(un_allocated);
				$("#allocated_loans").html(total_unsold_loans - un_allocated);

				var to_be_allocated = 0;
				var above_20 = 0;
				var to_15_19 = 0;
				var to_10_14 = 0;
 				
				// console.log(data);
				
				$.each(data, function(key, event) {



					if (eventsOpts.jsonDateFormat == 'human') { 
						var eventDateTime = event.date.split(" "),
							eventDate = eventDateTime[0].split("-"),
							eventTime = eventDateTime[1].split(":"),
							eventYear = eventDate[0],
							eventMonth = parseInt(eventDate[1]) - 1,
							eventDay = parseInt(eventDate[2]),
							//eventMonthToShow = eventMonth,
							eventMonthToShow = parseInt(eventMonth) + 1,
							eventHour = eventTime[0],
							eventMinute = eventTime[1],
							eventSeconds = eventTime[2],
							eventDate = new Date(eventYear, eventMonth, eventDay, eventHour, eventMinute, eventSeconds);
					    
					     var eventDateTime1 = event.pdate.split(" "),
							eventDate1 = eventDateTime1[0].split("-"),
							eventTime1 = eventDateTime1[1].split(":"),
							eventYear1 = eventDate1[0],
							eventMonth1 = parseInt(eventDate1[1]) - 1,
							eventDay1 = parseInt(eventDate1[2]),
							//eventMonthToShow = eventMonth,
							eventMonthToShow1 = parseInt(eventMonth1) + 1,
							eventHour1 = eventTime1[0],
							eventMinute1 = eventTime1[1],
							eventSeconds1 = eventTime1[2],
							eventDate1 = new Date(eventYear1, eventMonth1, eventDay1, eventHour1, eventMinute1, eventSeconds1);

						var eventDateTime2 = event.ndate.split(" "),
							eventDate2 = eventDateTime2[0].split("-"),
							eventTime2 = eventDateTime2[1].split(":"),
							eventYear2 = eventDate2[0],
							eventMonth2 = parseInt(eventDate2[1]) - 1,
							eventDay2 = parseInt(eventDate2[2]),
							//eventMonthToShow = eventMonth,
							eventMonthToShow2 = parseInt(eventMonth2) + 1,
							eventHour2 = eventTime2[0],
							eventMinute2 = eventTime2[1],
							eventSeconds2 = eventTime2[2],
							eventDate2 = new Date(eventYear2, eventMonth2, eventDay2, eventHour2, eventMinute2, eventSeconds2);
					} else {
						var eventDate = new Date(parseInt(event.date)),
							eventYear = eventDate.getFullYear(),
							eventMonth = eventDate.getMonth(),
							eventDay = eventDate.getDate(),
							eventMonthToShow = eventMonth + 1,
							eventHour = eventDate.getHours(),
							eventMinute = eventDate.getMinutes();


							var eventDate1 = new Date(parseInt(event.pdate)),
							eventYear1 = eventDate1.getFullYear(),
							eventMonth1 = eventDate1.getMonth(),
							eventDay1 = eventDate1.getDate(),
							eventMonthToShow1 = eventMonth1 + 1,
							eventHour1 = eventDate1.getHours(),
							eventMinute1 = eventDate1.getMinutes();

							var eventDate2 = new Date(parseInt(event.ndate)),
							eventYear2 = eventDate2.getFullYear(),
							eventMonth2 = eventDate2.getMonth(),
							eventDay2 = eventDate2.getDate(),
							eventMonthToShow2 = eventMonth2 + 1,
							eventHour2 = eventDate2.getHours(),
							eventMinute2 = eventDate2.getMinutes();
					}

					if (parseInt(eventMinute) <= 10) {
						eventMinute = "0" + parseInt(eventMinute);
					}

					if (parseInt(eventMinute1) <= 10) {
						eventMinute1 = "0" + parseInt(eventMinute1);
					}
					if (parseInt(eventMinute2) <= 10) {
						eventMinute2 = "0" + parseInt(eventMinute2);
					}


					if (limit === 0 || limit > i) {
						
						// if month or day exist then only show matched events
						if(event.date!=0){
							if ((month === false || month == eventMonth) && (day == '' || day == eventDay) && (year == '' || year == eventYear)) {
								// if initial load then load only future events
								if (month === false && eventDate < new Date()) {
								} else {
									
									moment.locale(eventsOpts.locales.locale);
									//eventStringDate = eventDay + "/" + eventMonthToShow + "/" + eventYear;
									eventStringDate = moment(eventDate).format(eventsOpts.dateFormat);
									
									var eventTitle;
									if (event.url) {
										eventTitle = '<a style="color:black;" href="'+event.url+'" target="' + eventLinkTarget + '" class="eventTitle ">' + event.title + ' </a>';
									} else {
										eventTitle = '<span class="eventTitle ">'+event.title+'</span>';
									}

									events.push('<tr>     <td style="display:none;"><input type="checkbox" class=" check loan_chk loan_check_'+event.project_id+' " alt="'+eventStringDate+'" name="loan[]" '+event.plan_dis+' value="'+event.project_id+'" style="display:none;">'+slno+'</td>    <td><div class="d-flex justify-content-between align-items-center status"><a href="'+eventurl+'" target="' + eventLinkTarget + '" data-toggle="tooltip" data-placement="right" title="'+event.new_tooltip+'" data-type="warning" >'+event.title+'</a><div class="color_code_'+event.project_id+'">'+event.colorCode+'</div></div></td> <td>'+event.city+'</td><td>'+event.state+'</td><td>10013</td><td>'+event.total_loan+'</td><td>'+event.interest+'</td><td>'+event.pclose_date+'</td><td>'+event.days_elapsed+'</td> <td class="plan_'+event.project_id+'">'+event.project_plan+'<input type="hidden" name="eli_users" id="eli_users_'+event.project_id+'" class="eli_users" value="'+event.eligible_users+'"></td> <td class="fileshare_'+event.project_id+'">'+event.file_share+'</td> <td class="ind_loantapes_'+event.project_id+'">'+event.loan_tapes+'</td> <td class="days_elapsed_loan_tapes">'+event.days_elapsed_loan_tapes+'</td> <td><a class="settlement_series" id="'+event.project_id+'" href="#" data-toggle="modal" data-target="#add_Notes"><img src="'+baseURL+'admin_template/assets/images/loan-closing/note-plus.png" /></a><input type="hidden" value="'+event.settlement_series+'" id="pid_'+event.project_id+'" class="settlement_'+event.project_id+'"  ></td> <td>'+event.project_line+'</td>    <td><div class="d-flex asn-anl"><a href='+baseURL+'backend/payments/corporate_assignment/'+event.project_id+'/S><button>ASN</button></a> <div class="view_asm_'+event.project_id+'">'+event.view_asm+'</div> <a href='+baseURL+'backend/payments/allonge/'+event.project_id+'/S><button>ALN</button></a> <div class="view_aln_'+event.project_id+'">'+event.view_aln+'</div></div> </td>   <td> <div class="d-flex" > '+event.app_doc_link+' '+event.ds_doc_link+'</div>   </td>   </tr>');

									totalamount += Number(event.totalamount);
	                                if(event.escrow!=''){
	                                    escrow_total += parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
	                                }
	                                if(event.total_loan!=''){
										loan_amt += parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
	                                }

									i++;
									slno++;
									total_loan_num[event.project_plan_id] = total_loan_num[event.project_plan_id] + 1;
								    escrow_summary[event.project_plan_id] = escrow_summary[event.project_plan_id] + parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
								    loan_amt_summary[event.project_plan_id] = loan_amt_summary[event.project_plan_id] + parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
								    dis_amt_summary[event.project_plan_id] = parseFloat(loan_amt_summary[event.project_plan_id]) - parseFloat(escrow_summary[event.project_plan_id]);
								}

								$('#totalamount').html('$'+number_format(totalamount, 2));

							} else {

								if ((month === false || month == eventMonth1) && (day == '' || day == eventDay1) && (year == '' || year == eventYear1) ) {
									if (month === false && eventDate1 < new Date()) {
										
									} else {
										
										moment.locale(eventsOpts.locales.locale);
										eventStringDate = moment(eventDate1).format(eventsOpts.dateFormat);
										//eventStringDate = eventMonthToShow1 + "/" + eventDay1 + "/" + eventYear1;

										var eventTitle;
										if (event.url) {
											eventTitle = '<a style="color:black;" href="'+event.url+'" target="' + eventLinkTarget + '" class="eventTitle ">' + event.title + ' </a>';
										} else {
											eventTitle = '<span class="eventTitle ">'+event.title+'</span>';
										}
										
	
										events.push('<tr>     <td style="display:none;"><input type="checkbox" class=" check loan_chk loan_check_'+event.project_id+' " alt="'+eventStringDate+'" name="loan[]" '+event.plan_dis+' value="'+event.project_id+'" style="display:none;">'+slno+'</td>    <td><div class="d-flex justify-content-between align-items-center status"><a href="'+eventurl+'" target="' + eventLinkTarget + '" data-toggle="tooltip" data-placement="right" title="'+event.new_tooltip+'" data-type="warning" >'+event.title+'</a><div class="color_code_'+event.project_id+'">'+event.colorCode+'</div></div></td> <td>'+event.city+'</td><td>'+event.state+'</td><td>10013</td><td>'+event.total_loan+'</td><td>'+event.interest+'</td><td>'+event.pclose_date+'</td><td>'+event.days_elapsed+'</td> <td class="plan_'+event.project_id+'">'+event.project_plan+'<input type="hidden" name="eli_users" id="eli_users_'+event.project_id+'" class="eli_users" value="'+event.eligible_users+'"></td> <td class="fileshare_'+event.project_id+'">'+event.file_share+'</td> <td class="ind_loantapes_'+event.project_id+'">'+event.loan_tapes+'</td> <td class="days_elapsed_loan_tapes">'+event.days_elapsed_loan_tapes+'</td> <td><a class="settlement_series" id="'+event.project_id+'" href="#" data-toggle="modal" data-target="#add_Notes"><img src="'+baseURL+'admin_template/assets/images/loan-closing/note-plus.png" /></a><input type="hidden" value="'+event.settlement_series+'" id="pid_'+event.project_id+'" class="settlement_'+event.project_id+'"  ></td> <td>'+event.project_line+'</td>    <td><div class="d-flex asn-anl"><a href='+baseURL+'backend/payments/corporate_assignment/'+event.project_id+'/S><button>ASN</button></a> <div class="view_asm_'+event.project_id+'">'+event.view_asm+'</div> <a href='+baseURL+'backend/payments/allonge/'+event.project_id+'/S><button>ALN</button></a> <div class="view_aln_'+event.project_id+'">'+event.view_aln+'</div></div> </td>  <td> <div class="d-flex" > '+event.app_doc_link+' '+event.ds_doc_link+'</div>   </td>  </tr>');

										totalamount += Number(event.totalamount);
		                                if(event.escrow!=''){
		                                    escrow_total += parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
		                                }
		                                if(event.total_loan!=''){
											loan_amt += parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
		                                }

										i++;
										slno++;
										
											total_loan_num[event.project_plan_id] = total_loan_num[event.project_plan_id] + 1;
										    escrow_summary[event.project_plan_id] = escrow_summary[event.project_plan_id] + parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
										    loan_amt_summary[event.project_plan_id] = loan_amt_summary[event.project_plan_id] + parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
										    dis_amt_summary[event.project_plan_id] = parseFloat(loan_amt_summary[event.project_plan_id]) - parseFloat(escrow_summary[event.project_plan_id]); 
									}
	                                // events.push('<input type="text" name="count_prjt" id="count_prjt" value="'+i+'"');
									$('#totalamount').html('$'+number_format(totalamount, 2));
									
								}else{ 
								
									if ((month === false || month == eventMonth2) && (day == '' || day == eventDay2) && (year == '' || year == eventYear2)) {
									 	// var heading = [];
										// if initial load then load only future events
										if (month === false && eventDate2 < new Date()) {
											
										} else {
											moment.locale(eventsOpts.locales.locale);
											eventStringDate = moment(eventDate2).format(eventsOpts.dateFormat);
											//eventStringDate = eventMonthToShow2 + "/" + eventDay2 + "/" + eventYear2;

											var eventTitle;
											if (event.url) {
												eventTitle = '<a style="color:black;" href="'+event.url+'" target="' + eventLinkTarget + '" class="eventTitle ">' + event.title + ' </a>';
											} else {
												eventTitle = '<span class="eventTitle ">'+event.title+'</span>';
											}
											//heading.push(event.title);
											var tooltipdata ;
											if(event.project_location!=''){
		                                        //tooltipdata = event.project_location;
		                                        tooltipdata = 'data-tooltip="'+event.project_location+'"';
											}else{
											 	tooltipdata = '';
											}

		                                   
											events.push('<tr><td><div class="d-flex justify-content-between align-items-center status"><a href="#" data-toggle="tooltip" data-placement="right" title="'+event.new_tooltip+'" data-type="warning" >'+eventTitle+'</a><i class="fa fa-circle color-info-light bgc-info-light"></i></div></td> <td>'+event.city+'</td><td>'+event.state+'</td><td>10013</td><td>$'+event.total_loan+'</td><td>'+event.interest+'</td><td>'+event.pclose_date+'</td><td>'+event.days_elapsed+'</td> <td class="plan_'+event.project_id+'">'+event.project_plan+'<input type="hidden" name="eli_users" id="eli_users_'+event.project_id+'" class="eli_users" value="'+event.eligible_users+'"></td> <td class="fileshare_'+event.project_id+'">'+event.file_share+'</td> <td class="ind_loantapes_'+event.project_id+'">'+event.loan_tapes+'</td> <td class="days_elapsed_loan_tapes">'+event.days_elapsed_loan_tapes+'</td> <td><a href="#" data-toggle="modal" data-target="#add_Notes"><img src="'+baseURL+'admin_template/assets/images/loan-closing/note-plus.png" /></a></td> <td>'+event.project_line+'</td>    <td><div class="d-flex asn-anl"><a href='+baseURL+'backend/payments/corporate_assignment/'+event.project_id+'/S><button>ASN</button></a> '+event.view_asm+' <a href='+baseURL+'backend/payments/allonge/'+event.project_id+'/S><button>ALN</button></a>'+event.view_aln+'</div> </td> <td> <div class="d-flex" > '+event.app_doc_link+' '+event.ds_doc_link+'</div>   </td>  </tr>');

											totalamount += Number(event.totalamount);
			                                if(event.escrow!=''){
			                                    escrow_total += parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
			                                }
			                                if(event.total_loan!=''){
												loan_amt += parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
			                                }
											i++;
											slno++;
											total_loan_num[event.project_plan_id] = total_loan_num[event.project_plan_id] + 1;
										    escrow_summary[event.project_plan_id] = escrow_summary[event.project_plan_id] + parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
		                                    loan_amt_summary[event.project_plan_id] = loan_amt_summary[event.project_plan_id] + parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
		                                    dis_amt_summary[event.project_plan_id] = parseFloat(loan_amt_summary[event.project_plan_id]) - parseFloat(escrow_summary[event.project_plan_id]); 
										}
										$('#totalamount').html('$'+number_format(totalamount, 2));
									}

							    }
							}
						
						} else if(event.date==0){
							
							if ((month === false || month == eventMonth1) && (day == '' || day == eventDay1) && (year == '' || year == eventYear1) ) {

								if (month === false && eventDate1 < new Date()) {
								} else {	
									if(search_text === '' || event.title.toLowerCase().indexOf(search_text.toLowerCase()) != -1){
										if(sale_loan_type == ''){
											moment.locale(eventsOpts.locales.locale);
											eventStringDate = moment(eventDate1).format(eventsOpts.dateFormat);
											//eventStringDate = eventMonthToShow1 + "/" + eventDay1 + "/" + eventYear1;
											 
											if (event.url) {
												var eventurl = event.url;
											} else {
												var eventurl = "#";
											}

											events.push('<tr>     <td style="display:none;"><input type="checkbox" class=" check loan_chk loan_check_'+event.project_id+' " alt="'+eventStringDate+'" name="loan[]" '+event.plan_dis+' value="'+event.project_id+'" style="display:none;">'+slno+'</td>    <td><div class="d-flex justify-content-between align-items-center status"><a href="'+eventurl+'" target="' + eventLinkTarget + '" data-toggle="tooltip" data-placement="right" title="'+event.new_tooltip+'" data-type="warning" >'+event.title+'</a><div class="color_code_'+event.project_id+'">'+event.colorCode+'</div></div></td> <td>'+event.city+'</td><td>'+event.state+'</td><td>'+event.project_zip+'</td><td>'+event.total_loan+'</td><td>'+event.interest+'</td><td>'+event.pclose_date+'</td><td>'+event.days_elapsed+'</td> <td class="plan_'+event.project_id+' d-flex w-100" >'+event.project_plan+'<input type="hidden" name="eli_users" id="eli_users_'+event.project_id+'" class="eli_users" value="'+event.eligible_users+'"></td> <td class="fileshare_'+event.project_id+'">'+event.file_share+'</td> <td class="ind_loantapes_'+event.project_id+'">'+event.loan_tapes+'</td> <td class="days_elapsed_loan_tapes">'+event.days_elapsed_loan_tapes+'</td> <td><a class="settlement_series" id="'+event.project_id+'" href="#" data-toggle="modal" data-target="#add_Notes"><img src="'+baseURL+'admin_template/assets/images/loan-closing/note-plus.png" /></a><input type="hidden" value="'+event.settlement_series+'" id="pid_'+event.project_id+'" class="settlement_'+event.project_id+'"  ></td> <td>'+event.project_line+'</td>    <td><div class="d-flex asn-anl"><a href='+baseURL+'backend/payments/corporate_assignment/'+event.project_id+'/S><button>ASN</button></a> <div class="view_asm_'+event.project_id+'">'+event.view_asm+'</div> <a href='+baseURL+'backend/payments/allonge/'+event.project_id+'/S><button>ALN</button></a> <div class="view_aln_'+event.project_id+'">'+event.view_aln+'</div></div> </td>   <td> <div class="d-flex" > '+event.app_doc_link+' '+event.ds_doc_link+'</div>   </td>   </tr>');

											totalamount += Number(event.totalamount);
			                                if(event.escrow!=''){
			                                    escrow_total += parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
			                                }
			                                if(event.total_loan!=''){
												loan_amt += parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
			                                }

											i++;
											slno++;
											total_loan_num[event.project_plan_id] = total_loan_num[event.project_plan_id] + 1;
										    escrow_summary[event.project_plan_id] = escrow_summary[event.project_plan_id] + parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
										    loan_amt_summary[event.project_plan_id] = loan_amt_summary[event.project_plan_id] + parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
			                                dis_amt_summary[event.project_plan_id] = parseFloat(loan_amt_summary[event.project_plan_id]) - parseFloat(escrow_summary[event.project_plan_id]);
			                                
			                                if((event.colorCode != '') && (event.sale_type == 'tobeallocated')){
			                                	to_be_allocated++;
			                                }
			                                if((event.colorCode != '') && (event.sale_type == 'to_10_14')){
			                                	to_10_14++;
			                                }
			                                if((event.colorCode != '') && (event.sale_type == 'to_15_19')){
			                                	to_15_19++;
			                                }
			                                if((event.colorCode != '') && (event.sale_type == 'above_20')){
			                                	above_20++;
			                                }
			                                $("#to_be_allocated").html(to_be_allocated);
			                                $("#to_10_14").html(to_10_14);
			                                $("#to_15_19").html(to_15_19);
			                                $("#above_20").html(above_20);

			                                   
										} else {
											if( (event.colorCode != '') && (sale_loan_type == event.sale_type)){
												moment.locale(eventsOpts.locales.locale);
												eventStringDate = moment(eventDate1).format(eventsOpts.dateFormat);
												//eventStringDate = eventMonthToShow1 + "/" + eventDay1 + "/" + eventYear1;
												 
												if (event.url) {
													var eventurl = event.url;
												} else {
													var eventurl = "#";
												}

												events.push('<tr>     <td style="display:none;"><input type="checkbox" class=" check loan_chk loan_check_'+event.project_id+' " alt="'+eventStringDate+'" name="loan[]" '+event.plan_dis+' value="'+event.project_id+'" style="display:none;">'+slno+'</td>    <td><div class="d-flex justify-content-between align-items-center status"><a href="'+eventurl+'" target="' + eventLinkTarget + '" data-toggle="tooltip" data-placement="right" title="'+event.new_tooltip+'" data-type="warning" >'+event.title+'</a><div class="color_code_'+event.project_id+'">'+event.colorCode+'</div></div></td> <td>'+event.city+'</td><td>'+event.state+'</td><td>'+event.project_zip+'</td><td>'+event.total_loan+'</td><td>'+event.interest+'</td><td>'+event.pclose_date+'</td><td>'+event.days_elapsed+'</td> <td class="plan_'+event.project_id+' d-flex w-100" >'+event.project_plan+'<input type="hidden" name="eli_users" id="eli_users_'+event.project_id+'" class="eli_users" value="'+event.eligible_users+'"></td> <td class="fileshare_'+event.project_id+'">'+event.file_share+'</td> <td class="ind_loantapes_'+event.project_id+'">'+event.loan_tapes+'</td> <td class="days_elapsed_loan_tapes">'+event.days_elapsed_loan_tapes+'</td> <td><a class="settlement_series" id="'+event.project_id+'" href="#" data-toggle="modal" data-target="#add_Notes"><img src="'+baseURL+'admin_template/assets/images/loan-closing/note-plus.png" /></a><input type="hidden" value="'+event.settlement_series+'" id="pid_'+event.project_id+'" class="settlement_'+event.project_id+'"  ></td> <td>'+event.project_line+'</td>    <td><div class="d-flex asn-anl"><a href='+baseURL+'backend/payments/corporate_assignment/'+event.project_id+'/S><button>ASN</button></a> <div class="view_asm_'+event.project_id+'">'+event.view_asm+'</div> <a href='+baseURL+'backend/payments/allonge/'+event.project_id+'/S><button>ALN</button></a> <div class="view_aln_'+event.project_id+'">'+event.view_aln+'</div></div> </td>  <td> <div class="d-flex" > '+event.app_doc_link+' '+event.ds_doc_link+'</div>   </td>  </tr>');

												totalamount += Number(event.totalamount);
				                                if(event.escrow!=''){
				                                    escrow_total += parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
				                                }
				                                if(event.total_loan!=''){
													loan_amt += parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
				                                }

												i++;
												slno++;
												total_loan_num[event.project_plan_id] = total_loan_num[event.project_plan_id] + 1;
											    escrow_summary[event.project_plan_id] = escrow_summary[event.project_plan_id] + parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
											    loan_amt_summary[event.project_plan_id] = loan_amt_summary[event.project_plan_id] + parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
				                                dis_amt_summary[event.project_plan_id] = parseFloat(loan_amt_summary[event.project_plan_id]) - parseFloat(escrow_summary[event.project_plan_id]);
				                                
				                                // if((event.colorCode != '') && (event.sale_type == 'tobeallocated')){
				                                // 	to_be_allocated++;
				                                // }
				                                // if((event.colorCode != '') && (event.sale_type == 'to_10_14')){
				                                // 	to_10_14++;
				                                // }
				                                // if((event.colorCode != '') && (event.sale_type == 'to_15_19')){
				                                // 	to_15_19++;
				                                // }
				                                // if((event.colorCode != '') && (event.sale_type == 'above_20')){
				                                // 	above_20++;
				                                // }
				                                // $("#to_be_allocated").html(to_be_allocated);
				                                // $("#to_10_14").html(to_10_14);
				                                // $("#to_15_19").html(to_15_19);
				                                // $("#above_20").html(above_20);

											}else  {
											}
										}		
									} 
								}
								$('#totalamount').html('$'+number_format(totalamount, 2));

							} else {

								if(day == ''){
									if ((eventMonth1>month && year == eventYear1) || eventDate1 > new Date() ){
									} else {
										if(search_text === '' || event.title.toLowerCase().indexOf(search_text.toLowerCase()) != -1){
											if(sale_loan_type == ''){
												moment.locale(eventsOpts.locales.locale);
												eventStringDate = moment(eventDate1).format(eventsOpts.dateFormat);
												//eventStringDate = eventMonthToShow1 + "/" + eventDay1 + "/" + eventYear1;
												 
												if (event.url) {
													var eventurl = event.url;
												} else {
													var eventurl = "#";
												}

												events.push('<tr>     <td style="display:none;"><input type="checkbox" class=" check loan_chk loan_check_'+event.project_id+' " alt="'+eventStringDate+'" name="loan[]" '+event.plan_dis+' value="'+event.project_id+'" style="display:none;">'+slno+'</td>    <td><div class="d-flex justify-content-between align-items-center status"><a href="'+eventurl+'" target="' + eventLinkTarget + '" data-toggle="tooltip" data-placement="right" title="'+event.new_tooltip+'" data-type="warning" >'+event.title+'</a><div class="color_code_'+event.project_id+'">'+event.colorCode+'</div></div></td> <td>'+event.city+'</td><td>'+event.state+'</td><td>'+event.project_zip+'</td><td>'+event.total_loan+'</td><td>'+event.interest+'</td><td>'+event.pclose_date+'</td><td>'+event.days_elapsed+'</td> <td class="plan_'+event.project_id+' d-flex w-100" >'+event.project_plan+'<input type="hidden" name="eli_users" id="eli_users_'+event.project_id+'" class="eli_users" value="'+event.eligible_users+'"></td> <td class="fileshare_'+event.project_id+'">'+event.file_share+'</td> <td class="ind_loantapes_'+event.project_id+'">'+event.loan_tapes+'</td> <td class="days_elapsed_loan_tapes">'+event.days_elapsed_loan_tapes+'</td> <td><a class="settlement_series" id="'+event.project_id+'" href="#" data-toggle="modal" data-target="#add_Notes"><img src="'+baseURL+'admin_template/assets/images/loan-closing/note-plus.png" /></a><input type="hidden" value="'+event.settlement_series+'" id="pid_'+event.project_id+'" class="settlement_'+event.project_id+'"  ></td> <td>'+event.project_line+'</td>    <td><div class="d-flex asn-anl"><a href='+baseURL+'backend/payments/corporate_assignment/'+event.project_id+'/S><button>ASN</button></a> <div class="view_asm_'+event.project_id+'">'+event.view_asm+'</div> <a href='+baseURL+'backend/payments/allonge/'+event.project_id+'/S><button>ALN</button></a> <div class="view_aln_'+event.project_id+'">'+event.view_aln+'</div></div> </td>  <td> <div class="d-flex" > '+event.app_doc_link+' '+event.ds_doc_link+'</div>   </td>  </tr>');

												totalamount += Number(event.totalamount);
				                                if(event.escrow!=''){
				                                    escrow_total += parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
				                                }
				                                if(event.total_loan!=''){
													loan_amt += parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
				                                }

												i++;
												slno++;
												total_loan_num[event.project_plan_id] = total_loan_num[event.project_plan_id] + 1;
											    escrow_summary[event.project_plan_id] = escrow_summary[event.project_plan_id] + parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
											    loan_amt_summary[event.project_plan_id] = loan_amt_summary[event.project_plan_id] + parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
				                                dis_amt_summary[event.project_plan_id] = parseFloat(loan_amt_summary[event.project_plan_id]) - parseFloat(escrow_summary[event.project_plan_id]);

				                                if((event.colorCode != '') && (event.sale_type == 'tobeallocated')){
				                                	to_be_allocated++;
				                                }
				                                if((event.colorCode != '') && (event.sale_type == 'to_10_14')){
				                                	to_10_14++;
				                                }
				                                if((event.colorCode != '') && (event.sale_type == 'to_15_19')){
				                                	to_15_19++;
				                                }
				                                if((event.colorCode != '') && (event.sale_type == 'above_20')){
				                                	above_20++;
				                                }
				                                $("#to_be_allocated").html(to_be_allocated);
				                                $("#to_10_14").html(to_10_14);
				                                $("#to_15_19").html(to_15_19);
				                                $("#above_20").html(above_20);

											} else {
												if((event.colorCode != '') && (sale_loan_type == event.sale_type)){
													moment.locale(eventsOpts.locales.locale);
													eventStringDate = moment(eventDate1).format(eventsOpts.dateFormat);
													//eventStringDate = eventMonthToShow1 + "/" + eventDay1 + "/" + eventYear1;
													 
													if (event.url) {
														var eventurl = event.url;
													} else {
														var eventurl = "#";
													}

													events.push('<tr>     <td style="display:none;"><input type="checkbox" class=" check loan_chk loan_check_'+event.project_id+' " alt="'+eventStringDate+'" name="loan[]" '+event.plan_dis+' value="'+event.project_id+'" style="display:none;">'+slno+'</td>    <td><div class="d-flex justify-content-between align-items-center status"><a href="'+eventurl+'" target="' + eventLinkTarget + '" data-toggle="tooltip" data-placement="right" title="'+event.new_tooltip+'" data-type="warning" >'+event.title+'</a><div class="color_code_'+event.project_id+'">'+event.colorCode+'</div></div></td> <td>'+event.city+'</td><td>'+event.state+'</td><td>'+event.project_zip+'</td><td>'+event.total_loan+'</td><td>'+event.interest+'</td><td>'+event.pclose_date+'</td><td>'+event.days_elapsed+'</td> <td class="plan_'+event.project_id+' d-flex w-100" >'+event.project_plan+'<input type="hidden" name="eli_users" id="eli_users_'+event.project_id+'" class="eli_users" value="'+event.eligible_users+'"></td> <td class="fileshare_'+event.project_id+'">'+event.file_share+'</td> <td class="ind_loantapes_'+event.project_id+'">'+event.loan_tapes+'</td> <td class="days_elapsed_loan_tapes">'+event.days_elapsed_loan_tapes+'</td> <td><a class="settlement_series" id="'+event.project_id+'" href="#" data-toggle="modal" data-target="#add_Notes"><img src="'+baseURL+'admin_template/assets/images/loan-closing/note-plus.png" /></a><input type="hidden" value="'+event.settlement_series+'" id="pid_'+event.project_id+'" class="settlement_'+event.project_id+'"  ></td> <td>'+event.project_line+'</td>    <td><div class="d-flex asn-anl"><a href='+baseURL+'backend/payments/corporate_assignment/'+event.project_id+'/S><button>ASN</button></a> <div class="view_asm_'+event.project_id+'">'+event.view_asm+'</div> <a href='+baseURL+'backend/payments/allonge/'+event.project_id+'/S><button>ALN</button></a> <div class="view_aln_'+event.project_id+'">'+event.view_aln+'</div></div> </td>  <td> <div class="d-flex" > '+event.app_doc_link+' '+event.ds_doc_link+'</div>   </td>  </tr>');

													totalamount += Number(event.totalamount);
					                                if(event.escrow!=''){
					                                    escrow_total += parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
					                                }
					                                if(event.total_loan!=''){
														loan_amt += parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
					                                }

													i++;
													slno++;
													total_loan_num[event.project_plan_id] = total_loan_num[event.project_plan_id] + 1;
												    escrow_summary[event.project_plan_id] = escrow_summary[event.project_plan_id] + parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
												    loan_amt_summary[event.project_plan_id] = loan_amt_summary[event.project_plan_id] + parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
					                                dis_amt_summary[event.project_plan_id] = parseFloat(loan_amt_summary[event.project_plan_id]) - parseFloat(escrow_summary[event.project_plan_id]);

					                                // if((event.colorCode != '') && (event.sale_type == 'tobeallocated')){
					                                // 	to_be_allocated++;
					                                // }
					                                // if((event.colorCode != '') && (event.sale_type == 'to_10_14')){
					                                // 	to_10_14++;
					                                // }
					                                // if((event.colorCode != '') && (event.sale_type == 'to_15_19')){
					                                // 	to_15_19++;
					                                // }
					                                // if((event.colorCode != '') && (event.sale_type == 'above_20')){
					                                // 	above_20++;
					                                // }
					                                // $("#to_be_allocated").html(to_be_allocated);
					                                // $("#to_10_14").html(to_10_14);
					                                // $("#to_15_19").html(to_15_19);
					                                // $("#above_20").html(above_20);

												}else  {
												}
											}
										}
									}
								} else {
									if((day == eventDay1) && (month == eventMonth1)){
										if(search_text === '' || event.title.toLowerCase().indexOf(search_text.toLowerCase()) != -1){
											if(sale_loan_type == ''){
												moment.locale(eventsOpts.locales.locale);
												eventStringDate = moment(eventDate1).format(eventsOpts.dateFormat);
												//eventStringDate = eventMonthToShow1 + "/" + eventDay1 + "/" + eventYear1;
												 
												if (event.url) {
													var eventurl = event.url;
												} else {
													var eventurl = "#";
												}

												events.push('<tr>     <td style="display:none;"><input type="checkbox" class=" check loan_chk loan_check_'+event.project_id+' " alt="'+eventStringDate+'" name="loan[]" '+event.plan_dis+' value="'+event.project_id+'" style="display:none;">'+slno+'</td>    <td><div class="d-flex justify-content-between align-items-center status"><a href="'+eventurl+'" target="' + eventLinkTarget + '" data-toggle="tooltip" data-placement="right" title="'+event.new_tooltip+'" data-type="warning" >'+event.title+'</a><div class="color_code_'+event.project_id+'">'+event.colorCode+'</div></div></td> <td>'+event.city+'</td><td>'+event.state+'</td><td>'+event.project_zip+'</td><td>'+event.total_loan+'</td><td>'+event.interest+'</td><td>'+event.pclose_date+'</td><td>'+event.days_elapsed+'</td> <td class="plan_'+event.project_id+' d-flex w-100" >'+event.project_plan+'<input type="hidden" name="eli_users" id="eli_users_'+event.project_id+'" class="eli_users" value="'+event.eligible_users+'"></td> <td class="fileshare_'+event.project_id+'">'+event.file_share+'</td> <td class="ind_loantapes_'+event.project_id+'">'+event.loan_tapes+'</td> <td class="days_elapsed_loan_tapes">'+event.days_elapsed_loan_tapes+'</td> <td><a class="settlement_series" id="'+event.project_id+'" href="#" data-toggle="modal" data-target="#add_Notes"><img src="'+baseURL+'admin_template/assets/images/loan-closing/note-plus.png" /></a><input type="hidden" value="'+event.settlement_series+'" id="pid_'+event.project_id+'" class="settlement_'+event.project_id+'"  ></td> <td>'+event.project_line+'</td>    <td><div class="d-flex asn-anl"><a href='+baseURL+'backend/payments/corporate_assignment/'+event.project_id+'/S><button>ASN</button></a> <div class="view_asm_'+event.project_id+'">'+event.view_asm+'</div> <a href='+baseURL+'backend/payments/allonge/'+event.project_id+'/S><button>ALN</button></a> <div class="view_aln_'+event.project_id+'">'+event.view_aln+'</div></div> </td>  <td> <div class="d-flex" > '+event.app_doc_link+' '+event.ds_doc_link+'</div>   </td>  </tr>');

												totalamount += Number(event.totalamount);
				                                if(event.escrow!=''){
				                                    escrow_total += parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
				                                }
				                                if(event.total_loan!=''){
													loan_amt += parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
				                                }

												i++;
												slno++;
												total_loan_num[event.project_plan_id] = total_loan_num[event.project_plan_id] + 1;
											    escrow_summary[event.project_plan_id] = escrow_summary[event.project_plan_id] + parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
											    loan_amt_summary[event.project_plan_id] = loan_amt_summary[event.project_plan_id] + parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
				                                dis_amt_summary[event.project_plan_id] = parseFloat(loan_amt_summary[event.project_plan_id]) - parseFloat(escrow_summary[event.project_plan_id]);
				                                
				                                // if((event.colorCode != '') && (event.sale_type == 'tobeallocated')){
				                                // 	to_be_allocated++;
				                                // }
				                                // if((event.colorCode != '') && (event.sale_type == 'to_10_14')){
				                                // 	to_10_14++;
				                                // }
				                                // if((event.colorCode != '') && (event.sale_type == 'to_15_19')){
				                                // 	to_15_19++;
				                                // }
				                                // if((event.colorCode != '') && (event.sale_type == 'above_20')){
				                                // 	above_20++;
				                                // }
				                                // $("#to_be_allocated").html(to_be_allocated);
				                                // $("#to_10_14").html(to_10_14);
				                                // $("#to_15_19").html(to_15_19);
				                                // $("#above_20").html(above_20); 
											
											} else {
												if((event.colorCode != '') && (sale_loan_type == event.sale_type)){
													moment.locale(eventsOpts.locales.locale);
													eventStringDate = moment(eventDate1).format(eventsOpts.dateFormat);
													//eventStringDate = eventMonthToShow1 + "/" + eventDay1 + "/" + eventYear1;
													 
													if (event.url) {
														var eventurl = event.url;
													} else {
														var eventurl = "#";
													}

													events.push('<tr>     <td style="display:none;"><input type="checkbox" class=" check loan_chk loan_check_'+event.project_id+' " alt="'+eventStringDate+'" name="loan[]" '+event.plan_dis+' value="'+event.project_id+'" style="display:none;">'+slno+'</td>    <td><div class="d-flex justify-content-between align-items-center status"><a href="'+eventurl+'" target="' + eventLinkTarget + '" data-toggle="tooltip" data-placement="right" title="'+event.new_tooltip+'" data-type="warning" >'+event.title+'</a><div class="color_code_'+event.project_id+'">'+event.colorCode+'</div></div></td> <td>'+event.city+'</td><td>'+event.state+'</td><td>'+event.project_zip+'</td><td>'+event.total_loan+'</td><td>'+event.interest+'</td><td>'+event.pclose_date+'</td><td>'+event.days_elapsed+'</td> <td class="plan_'+event.project_id+' d-flex w-100" >'+event.project_plan+'<input type="hidden" name="eli_users" id="eli_users_'+event.project_id+'" class="eli_users" value="'+event.eligible_users+'"></td> <td class="fileshare_'+event.project_id+'">'+event.file_share+'</td> <td class="ind_loantapes_'+event.project_id+'">'+event.loan_tapes+'</td> <td class="days_elapsed_loan_tapes">'+event.days_elapsed_loan_tapes+'</td> <td><a class="settlement_series" id="'+event.project_id+'" href="#" data-toggle="modal" data-target="#add_Notes"><img src="'+baseURL+'admin_template/assets/images/loan-closing/note-plus.png" /></a><input type="hidden" value="'+event.settlement_series+'" id="pid_'+event.project_id+'" class="settlement_'+event.project_id+'"  ></td> <td>'+event.project_line+'</td>    <td><div class="d-flex asn-anl"><a href='+baseURL+'backend/payments/corporate_assignment/'+event.project_id+'/S><button>ASN</button></a> <div class="view_asm_'+event.project_id+'">'+event.view_asm+'</div> <a href='+baseURL+'backend/payments/allonge/'+event.project_id+'/S><button>ALN</button></a> <div class="view_aln_'+event.project_id+'">'+event.view_aln+'</div></div> </td>   <td> <div class="d-flex" > '+event.app_doc_link+' '+event.ds_doc_link+'</div>   </td>  </tr>');

													totalamount += Number(event.totalamount);
					                                if(event.escrow!=''){
					                                    escrow_total += parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
					                                }
					                                if(event.total_loan!=''){
														loan_amt += parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
					                                }

													i++;
													slno++;
													total_loan_num[event.project_plan_id] = total_loan_num[event.project_plan_id] + 1;
												    escrow_summary[event.project_plan_id] = escrow_summary[event.project_plan_id] + parseFloat(event.escrow.replace(/[^0-9-.]/g, ''));
												    loan_amt_summary[event.project_plan_id] = loan_amt_summary[event.project_plan_id] + parseFloat(event.total_loan.replace(/[^0-9-.]/g, ''));
					                                dis_amt_summary[event.project_plan_id] = parseFloat(loan_amt_summary[event.project_plan_id]) - parseFloat(escrow_summary[event.project_plan_id]);
					                                
					                                // if((event.colorCode != '') && (event.sale_type == 'tobeallocated')){
					                                // 	to_be_allocated++;
					                                // }
					                                // if((event.colorCode != '') && (event.sale_type == 'to_10_14')){
					                                // 	to_10_14++;
					                                // }
					                                // if((event.colorCode != '') && (event.sale_type == 'to_15_19')){
					                                // 	to_15_19++;
					                                // }
					                                // if((event.colorCode != '') && (event.sale_type == 'above_20')){
					                                // 	above_20++;
					                                // }
					                                // $("#to_be_allocated").html(to_be_allocated);
					                                // $("#to_10_14").html(to_10_14);
					                                // $("#to_15_19").html(to_15_19);
					                                // $("#above_20").html(above_20);

												}else  {
												}
											}
										}
									}
								}
								$('#totalamount').html('$'+number_format(totalamount, 2));
							
							}

                    	}
					}

					$('#unsold_loan_total').html('$'+ number_format(loan_amt,2));
					$('#un_allocated_loans_amt').html('$'+ number_format(un_allocated_amt,2));
					allocated_loans_amt = loan_amt - un_allocated_amt;
					$('#allocated_loans_amt').html('$'+ number_format(allocated_loans_amt,2));
					
					// add mark in the dayList to the days with events
					if (eventYear == flags.wrap.attr('data-current-year') && eventMonth == flags.wrap.attr('data-current-month')) {
						// flags.wrap.find('.currentMonth .eventsCalendar-daysList #dayList_' + parseInt(eventDay)).addClass('dayWithEvents').attr('data-tooltip',heading);
						flags.wrap.find('.eventCalendar-currentMonth .eventCalendar-daysList #dayList_' + parseInt(eventDay)).addClass('eventCalendar-dayWithEvents');
					} else {  
						//$('.eventCalendar-wrap .arrow.prev').css('z-index',3);
						//$('.eventCalendar-wrap .arrow').css('z-index',3);
					}

					if (eventYear1 == flags.wrap.attr('data-current-year') && eventMonth1 == flags.wrap.attr('data-current-month')) {
						// flags.wrap.find('.currentMonth .eventsCalendar-daysList #dayList_' + parseInt(eventDay1)).addClass('dayWithEvents').attr('data-tooltip',heading);
						flags.wrap.find('.eventCalendar-currentMonth .eventCalendar-daysList #dayList_' + parseInt(eventDay1)).addClass('eventCalendar-dayWithEvents');
					} else {  
						//$('.eventCalendar-wrap .arrow.prev').css('z-index',3);
						//$('.eventCalendar-wrap .arrow').css('z-index',3);
					}

					if (eventYear2 == flags.wrap.attr('data-current-year') && eventMonth2 == flags.wrap.attr('data-current-month')) {
						// flags.wrap.find('.currentMonth .eventsCalendar-daysList #dayList_' + parseInt(eventDay2)).addClass('dayWithEvents').attr('data-tooltip',heading);
						flags.wrap.find('.eventCalendar-currentMonth .eventCalendar-daysList #dayList_' + parseInt(eventDay1)).addClass('eventCalendar-dayWithEvents');
					} else {  
						//$('.eventCalendar-wrap .arrow.prev').css('z-index',3);
						//$('.eventCalendar-wrap .arrow').css('z-index',3);
					}

					/*$('.dayWithEvents').bind('mouseover', function() {  
						$('.eventCalendar-wrap .arrow.prev').css('z-index',0);
					});
					$('.dayWithEvents').bind('mouseout', function() {  
						$('.eventCalendar-wrap .arrow.prev').css('z-index',3);
					});
                  	$(document).on("mouseover", ".tooltiptd", function() {
			 	       $(this).find('div').closest('.tool-tip-div').show();
		            });
					$(document).on("mouseout", ".tooltiptd", function() {
		                $(this).find('div').closest('.tool-tip-div').hide();
		            });*/

				});

				events.push('</tbody><tfoot><tr class="total_amt"><td colspan="2" data-sorter="false"><span class="total_amt"><b>Total</b></span></td><td></td><td></td><td style="text-align:right;" id="amt_val"><b> $'+number_format(loan_amt,2)+'</b></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr></tfoot>');

				if(i==0){

					$('#totalamount').html('$0.00');
					// $('#total_application').html('0');
					// $('#total_application_acpt').html('0');
					// $('#application_count_one_acc').html('0');
					// $('#application_count_one_amount').html('$0.00');
					// $('#application_mul_count').html('0');
					// $('#application_count_multiple_amount').html('$0.00');
				}
				events.push('</table>');
				
			} else {
				if (data.length) {
					var search_text = $('#search_text').val();
				}else{
					var search_text = "";
				}
              	events.push('<div class="filter-bar"><form name="search_form" id="search_form" method="post" action=""><input type="hidden" name="csrf_test_name" value="'+global_csrf_token_value+'"><div><div><label style="color:#000000;">Project Name : </label><div class=""><input type="text" name="search_text" id="search_text" class="input-xlarge" value="'+search_text+'" placeholder="Search" style="width:220px" ></div></div><button type="submit" id="search" name="search" class="btn btn-primary ">Search</button><button type="submit" id="search1" name="clr" value="clr" class="btn btn-primary">Reset</button></div></form>');
              	events.push('<br><div style="padding:12px 0px 0px 0px;">No Projects Found</div>');

          	}


          	if (!events.length) {
				events.push('<li class="eventCalendar-noEvents"><p>' + eventsOpts.locales.txt_noEvents + '</p></li>');
			    $('#totalamount').html('N/A');
			}

			flags.wrap.find('.eventCalendar-loading').hide();
            
			$('#loan_sales_calendar')
				.html(events.join(''));
            // flags.wrap.find('.eventsCalendar-list').find("#color_display").html('<span data-tooltip="Files that have been allocated to a loan tape for 20 days or more" data-tooltip-position="bottom" class="tooltip-tax smallbox boxorg-red" ></span><span data-tooltip="Files that have been allocated to a loan tape for 15-19 days" data-tooltip-position="bottom" class="tooltip-tax smallbox boxorg-org" ></span><span data-tooltip="Files that have been allocated to a loan tape for 10-14 days" data-tooltip-position="bottom" class="tooltip-tax smallbox boxorg-yellow" ></span><span data-tooltip="Files that recently closed and need to be allocated" data-tooltip-position="bottom" class="tooltip-tax smallbox boxorg-light-blue"></span>');
			// flags.wrap.find('.eventsCalendar-list').find("#prjt_details").html("Total Loans :" +i);


			$('#loan_sales_calendar').animate({
				opacity: 1,
				//height: "toggle"
			}, eventsOpts.moveSpeed);


			$('[data-toggle="tooltip"]').tooltip();
			$('select').selectpicker();

			$('#loanGenerateList').DataTable({
		       "columnDefs": [{
		            
		            "orderable": true, 
		            "targets": 0,
		            "width": "5%", 
		            "targets": 0 ,
		        }],
		        "paging":   false,
		        "dom":"<t>",
		        // "order": [
		        //     [2, 'desc'],[7, 'asc']
		        // ],
		        // "displayLength": 10,
		    });

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

	$(document).on({
	    change: function(){
	    	var val = $(this).val();
			var Id = $(this).attr("id");

			// $(this).closest('tr').find('[type=checkbox]').show();
			$(this).closest('tr').find('[type=checkbox]').prop('checked',true);
			
			$('#floating_button').show();
	    }
	}, '.plan_name');

	$(document).on({
	    click: function(){
	    	ShwLoadingPanel();
	    	var flag = 0;
	    	var dis_name = " Project Plan is generated successfully and saved under 'Institutional Loan Tapes' menu.";
	        var total_len = $(".loan_chk").length;
	        var checked_len = $(".loan_chk:checked").length;
	        if(total_len==checked_len){
	           	//$(".sel_all").checked('true');
	        }
	        $('#floating_button').hide();
	        var data = [];
	        var userid;
	        
	       	$(".loan_chk:checked").each(function(){
	          	var plan = $(this).closest('tr').find('select.plan_name').val();
	            var project_id = $(this).closest('tr').find('select.plan_name').prop('id');
				data.push({project_id:project_id,plan:plan});
			});


	    	
	           
			// var post_data = {user_name:name,projects:JSON.stringify(data)};
			//tab_type
			var tab_type = new URL(window.location.href).pathname.split('/').filter(Boolean).pop();
			
			var post_data = {user_name:name,projects:data,userid:userid,loan_type:'bridge',tab_type:tab_type};
	    	post_data[global_csrf_token_name]= global_csrf_token_value;
			$.ajax({
		        type: "POST",
		        data:post_data,
		        url : baseURL+'dashboard/loan_sales_dashboard/add_loan_tapes_planlevel',
		        dataType : 'json',
		        success : function(response){
		        	remvLoadingPanel();
		          	if(response!=''){
			          	flag = 1;
			          	
			          	$.each(response.project_id,function(item,val){
	                     
		                    if(response.subid==14238){
		                     	$('.prjt_tr_'+val).hide();
		                    }
		                    $(".loan_check_"+val).prop('disabled',true);
		                    $(".loan_check_"+val).prop('checked',false);
		                    
		                    if(response.aln_link[val]!=''){
		                    	$('.view_aln_'+val).html(response.aln_link[val]);
		                    }
		                    if(response.asm_link[val]!=''){
		                      	$('.view_asm_'+val).html(response.asm_link[val]);
		                    }

		                    $(".plan_"+val).html(response.msg_list[val]);
		                    $(".view_"+val).html(response.view_link[val]);
		                    $(".fileshare_"+val).html(response.file_share[val]);
		                    if(response.bgcolor[val]!=""){
		                    	// $('.bgcolor_'+val).closest('tr').css("background-color", "'"+response.bgcolor[val]+"'");
		                    	$('color_code_'+val).html(response.bgcolor[val]);
		                    }
		                    $(".ind_loantapes_"+val).html(response.loan_tape_status_val);
		                    $('select').selectpicker();
	                    
			           	});



	                  	if(response.new_tr!=''){
			          		$(".loanSaleCalendar tbody").append(response.new_tr);
			          	}
			          	
			          	// if(response.loantapes){
	             //         	$.each(response.parent_id,function(item,val){

			           //       	if((($(".summary_tab tbody" ).find(".tr_"+val)).length) > 0){
			           //         		$(".summary_tab tbody" ).find(".tr_"+val).html('');
			           //          	$(".summary_tab tbody" ).find(".tr_"+val).replaceWith(response.loantapes[val]);
			           //          }
			           //          if((($(".summary_tab tbody" ).find(".view_tape_tr_"+val)).length) > 0){
			           //           	$(".summary_tab tbody" ).find(".view_tape_tr_"+val).html('');
			           //            	$(".summary_tab tbody" ).find(".view_tape_tr_"+val).replaceWith(response.list_loantapes[val]);
			           //          }
	                    
	             //     		});

	             // 		}
		           
		         	}
		      	}

		    });
	      
	       	if(flag!=0){
	       		alert(dis_name);
	       	}

	    }
	},'#floating_button');

	$(document).on({
	    click: function(){
	    	$('#project_id').val('');
			$('#plan_id').val('');
			$('#parent').val('');
			$('#row').val('');
			$('#docid').val('');
	    	
			var project_id  = $(this).attr("id");
			var plan_id     = $(this).data("planid");
			var parent     = $(this).data("parent");
			// var con 		= confirm("Do you want to delete this plan?");
			var row        = $(this).closest('tr');
			var docid = $(this).attr("rel");
			var userid;

			$('#project_id').val(project_id);
			$('#plan_id').val(plan_id);
			$('#parent').val(parent);
			// $('#row').val(row);
			$('#docid').val(docid);
	    }
	}, '.delete_plan');

	$(document).on({
	    click: function(){

	    	var project_id  = $('#project_id').val();
			var plan_id     = $('#plan_id').val();
			var parent     	= $('#parent').val();
			// var con 		= confirm("Do you want to delete this plan?");
			var row        	= $('#row').val();
			var docid 		= $('#docid').val();
			var reason 		= $('#reason').val();

			if(reason !=""){

			var userid;

			var post_plan_data = {project_id:project_id,plan_id:plan_id,docid:docid,parent:parent,userid:userid,reason:reason};
	        	post_plan_data[global_csrf_token_name]= global_csrf_token_value;
			
			$.ajax({
		        type: "POST",
		        data:post_plan_data,
		        url : baseURL+'dashboard/loan_sales_dashboard/delete_project_plan',
		        dataType : 'json',
		        success : function(response){
		        	$('#removeAllocation').modal('hide');
	        		$('.plan_data_div_'+project_id).remove();
	        		$('.view_'+project_id).html('');
	        		$('#reason').val('');
	        		// row.css("background-color", "#85BBE5");
	        		$(".loan_check_"+project_id).prop("disabled", false);
                         
                   	if((($(".loanSaleCalendar tbody" ).find(".tr_"+response.parent)).length) > 0){
	                    $(".loanSaleCalendar tbody" ).find(".tr_"+response.parent).replaceWith(response.new_tr);
	                    // $(".summary_tab tbody" ).find(".tr_"+response.parent).append(response.list_loantapes);
                    }

                    if(response.new_tr==''){
		           	  	$('.tr_'+response.parent).remove();
		           	  	$(".view_tape_tr_"+response.parent).remove();
		           	}

                  	$('.plan_'+project_id).html(response.project_plan);
                  	$('select').selectpicker();
                  	// row.find('.days_elapsed_loan_tapes').html('');
                  	$(".ind_loantapes_"+project_id).html('');
                  	$(".fileshare_"+project_id).html('');
		        }
		    });
		}else{
			$( "#reason" ).focus();
			$('#error-label').html('Reason is requierd');
		}
	    }
	}, '.delete_plan_modal');

	var countryVal;
	$(document).on({
	    change: function(){
	    	var val = $(this).val();
	    	// var uid = $(this).attr("rel");
	    	// var docid = $(this).attr("data");
	    	var tape_id =  $(this).attr("rel");
	    	var pid = $(this).attr("data");
	    	var uid = $(this).data("user");
		    var con = confirm("Do you want to change Status?");
		  		if(con) {
		  			var post_data = {status:val,tape_id:tape_id,pid:pid};
	                post_data[global_csrf_token_name]= global_csrf_token_value;
					$.ajax({
				        type: "POST",
				        data:post_data,
				        url : baseURL+'dashboard/loan_sales_dashboard/update_loan_tape_status',
				        dataType : 'json',
				        success : function(response){
				        	
				        	if(response.tape_status=='Sale Complete'){
	                      		var url = baseURL + 'dashboard/loan_sales_dashboard/list_tapes_ajax';
		                  		var data = {uid:uid};
		    	          		data[global_csrf_token_name]= global_csrf_token_value;
		                  		get_tapes(data,url);
		                  		$(".view_loans_"+response.doc_id).show();
		                  		$(".tr_"+tape_id).remove();
		                   		$(".summary_tab tbody" ).find(".tr_"+response.parent).replaceWith(response.loantapes);
	                      		$(".summary_tab tbody" ).find(".view_tape_tr_"+response.parent).replaceWith(response.loantape_list);
				        	}
				        }
				    });
				}else{
					$(this).val(countryVal); //set back
	    			return;
				}
				countryVal = val;
	    }
	}, '#loan_tape_status');

	$(document).on({
	    change: function(){
	    	ShwLoadingPanel();
	    	var val 	= $(this).val();
			var Id 		= $(this).attr("id");
			var optval  = $(this).find(':selected').data('optval');
			
			// var con = confirm("Do you want to change Line?");
		 //  	if(con) {
		  		var post_data = {value:val,id:Id,optval:optval};
	        	post_data[global_csrf_token_name]= global_csrf_token_value;
				$.ajax({
			        type: "POST",
			        data:post_data,
			        url : baseURL+'dashboard/loan_sales_dashboard/edit_project_line',
			        dataType : 'json',
			        success : function(response){
			        	if(response=="true"){
			        		remvLoadingPanel();
			        		//alert('Updated successfully');
			            }
			        }
			    });
			// }
	    }
	}, '.projectline1');

	$(document).on({
	    click: function(e){
		    var user_id = $(this).data('user_id');
			var project_id = $(this).data('pro_id');
			var user_provider = $(this).data('user_sp');
			var ModalLabel = '';
		    postData = {user_id:user_id,
		    			project_id:project_id,
		    			user_provider:user_provider};
	    	postData[global_csrf_token_name]= global_csrf_token_value;
	        $.ajax({
	            type: "POST",
	         	dataType:"json",
	         	async:false,
	            data:postData,
	            url: baseURL+'dashboard/loan_sales_dashboard/get_box_doc_details',
	            success:function(data) {
	            	// Toorak Capital Partners LLC - 364-370 South Orange Avenue
	            	$("#pro_id").val(data.pro_id);
	            	$("#loan_documents").html(data.docs_list);
	            	
	            	if(user_provider == 'S'){
	            		$("#send_box").html('Send to Share File');
	            		var ModalLabel = 'Share File docs for ' + data.user_name + ' - ' + data.project_name; 
	            		// $("#box_heading span").after(ModalLabel);
	            		$("#box_heading").html('<span><img src="'+baseURL+'admin_template/assets/images/loan-closing/icon-buildings.png" class="mr-2"></span>'+ModalLabel);
	            	} else if(user_provider == 'B'){
	            		$("#send_box").html('Send to Box');
	            		var ModalLabel = 'Box.com docs for ' + data.user_name + ' - ' + data.project_name; 
	            		// $("#box_heading span").after(ModalLabel);
	            		$("#box_heading").html('<span><img src="'+baseURL+'admin_template/assets/images/loan-closing/icon-buildings.png" class="mr-2"></span>'+ModalLabel);
	            	} else if(user_provider == 'SF'){
	            		$("#send_box").html('Send to SFTP');
	            		var ModalLabel = 'SFTP docs for ' + data.user_name + ' - ' + data.project_name; 
	            		// $("#box_heading span").after(ModalLabel);
	            		$("#box_heading").html('<span><img src="'+baseURL+'admin_template/assets/images/loan-closing/icon-buildings.png" class="mr-2"></span>'+ModalLabel);
	            	}
	            	
	            	// $('#send_box').html('Send to box');
	            	// $('#save_uw_docs').html('Save');
	            	// $('#save_closing_docs').html('Save');
	            }
	        });
	    }
	}, '.box_div');

	$(document).on({
	    click: function(e){
	        e.preventDefault();

        	var formData = new FormData($("#save_box_closing_docs")[0]);
			var formDataPrecios = new FormData($("#save_box_uw_docs")[0]);
			var formDataThird = new FormData($("#saveboxclose_others")[0]);
			var formDataFour = new FormData($("#saveboxuw_others")[0]);
			var formDataFive = new FormData($("#save_box_closing_package_docs")[0]);
			
			for (var pair of formDataPrecios.entries()) {
			    formData.append(pair[0], pair[1]);
			}

			for (var pair1 of formDataThird.entries()) {
			    formData.append(pair1[0], pair1[1]);
			}

			for (var pair2 of formDataFour.entries()) {
			    formData.append(pair2[0], pair2[1]);
			}

			for (var pair3 of formDataFive.entries()) {
			    formData.append(pair3[0], pair3[1]);
			}


	        $('#save_box_docs').html('Please wait... <img src="'+baseURL+'images/loading36.gif" />');
	        $.ajax({
	            type:'POST',
	            processData: false,  // Important!
	            contentType: false,
	            cache: false,
	            data:formData,
	            url: baseURL+'dashboard/loan_sales_dashboard/save_box_docs',
	            success:function(data) {
	            	$('#save_box_docs').html('Save');
	            	var data = JSON.parse(data);
	            	if(data.status = true){
	            		$("#loan_docs").html('');
	            		$("#loan_documents").html(data.docs_list);
	            	}
	            }
	        });
	    }
	}, '#save_box_docs');

	$(document).on({
	    click: function(e){
	        e.preventDefault();
	        var project_id = $('#pro_id').val();
	        var pending_proj_id = $('#pending_project_id').val();
	        var user_id = $('#user_id').val();
	        var user_provider = $('#user_provider').val();

	        if(user_provider == 'S'){
	        	var file_send_url = 'dashboard/loan_sales_dashboard/send_share_file_doc';
	        } else if(user_provider == 'B') {
	        	var file_send_url = 'dashboard/loan_sales_dashboard/send_box_doc';
	        } else if(user_provider == 'SF') {
	        	var file_send_url = 'dashboard/loan_sales_dashboard/send_sftp_file_doc';
	        }
	        
	        postData = {user_id:user_id,
	        			project_id:project_id,
		    			pending_proj_id:pending_proj_id};
	    	postData[global_csrf_token_name]= global_csrf_token_value;
	    	swal("Uploaded!", "Files have been transferred successfully", "success");
	    	/*if(user_id == 17058){
	    	} else{
	        	$('#send_box').html('Please wait... <img src="'+baseURL+'images/loading36.gif" />');
	    	}*/
	    	$.ajax({
	            type: "POST",
	         	dataType:"json",
	         	//async:false,
	            data:postData,
	            url: baseURL+file_send_url,
	            success:function(data) {
	            	$('#send_box').html('Send to box');
	            	if(data.status = true){
	            	}
	            }
	        });
	        
	    }
	}, '#send_box');

	$(document).on({
	    click: function(){
	    	var Id = $(this).attr("id");
	    	var val2 = $('#pid_'+Id).val();

	    	$('#projectid').val('');
			$('#val2').val('');	
			$('#settlement_series').val('');

			$('#projectid').val(Id);
			$('#val2').val(val2);
			
			$.get(base_url+'dashboard/loan_sales_dashboard/get_sales_notes',{'project_id':Id},function(data){
		      reponse_data = $.parseJSON(data);
		      $('#settlement_series').val(reponse_data.msg);
		    });
	    }

	}, '.settlement_series');


	$(document).on({
	    click: function(){
	    	var val = $('#settlement_series').val();
	    	var Id = $('#projectid').val();

  			var post_data = {value:val,id:Id};
            post_data[global_csrf_token_name]= global_csrf_token_value;
			$.ajax({
		        type: "POST",
		        data:post_data,
		        url : baseURL+'dashboard/loan_sales_dashboard/edit_settlement_series',
		        dataType : 'json',
		        success : function(response){
		        	$('#add_Notes').modal('hide');
		        	var val2 = $('#pid_'+Id).val(val);
		        	if(response=="true"){
		        		//alert('Updated successfully');
	              	}
		        }
		    });
	    }

	}, '#save_settlement_series');

	$('body').on('click', '.boxstatus', function(e){ 
	    e.preventDefault();
	    var pending_doc_id = $(this).data('id');
	    var project_id = $('#boxstatus_'+ pending_doc_id).attr('data-project');//$(this).data('project');
	    var box_status = $('#boxstatus_'+ pending_doc_id).attr('data-boxstatus');//$(this).data('boxstatus');
	    postData = {pending_doc_id:pending_doc_id,
	        project_id:project_id,
	        box_status:box_status};
	    postData[global_csrf_token_name]= global_csrf_token_value;
	    $.ajax({
	        type: "POST",
	        dataType:"json",
	        async:false,
	        data:postData,
	        url: baseURL+'dashboard/loan_sales_dashboard/update_doc_box_status',
	        success:function(data) {
	            if(data.status == true){
	                if(data.box_status == 'A'){
	                	$('#boxstatus_'+ pending_doc_id).attr('data-boxstatus','A');
	                    $('#boxstatus_'+ pending_doc_id).html('<i class="fa fa-times-circle-o font-21 color-success ml-auto"></i>');
	                } else {
	                	 $('#boxstatus_'+ pending_doc_id).attr('data-boxstatus','I');
	                  $('#boxstatus_'+ pending_doc_id).html('<i class="fa fa-times-circle-o font-21 color-danger ml-auto"></i>');
	                 
	                }
	            }
	        }

	    });
	});


	function get_total_info_term_pie(month, year){
		var id = $(this).data('id');
	    var post_data = {month:month, year:year};
        post_data[global_csrf_token_name]= global_csrf_token_value;
        // $('#container-35').append('<div id="loadingPnl"></div>');
        // $(".chart-loader").parent().css('display','table');

        $('#container-35').html('<div class="chart-loader"><span>Loading... </span><img src="'+baseURL+'images/loading36.gif" /></div>');
        $.ajax({
            type: 'POST',
            url: base_url + 'dashboard/loan_sales_dashboard/sales_dashboard_investors',
            data: post_data,
            dataType: "json",
            success: function (response) {
                // console.log(response);

                var total_invested_loans = response.total_invested_loans
	            var data = response.pie;
	            var data_v = [];
	            $.each(data.M_perc_parent,function(k, asset){ 
	                // console.log(k);

	                if(k == 'Peter Raith'){
	                    var pname = 'LRML';
	                } else{
	                    var pname = k;
	                }

	                if ( k in data.sub_perc){
	                    // $.each(data.sub_perc[k],function(p, sub){
	                        // console.log(data.sub_perc_amt[k][p]);
	                        // data_v.push({name: p, y: sub, color: '#3f8ce4'});
	                        // data_v +='<li> '+p+': '+data.sub_perc_amt[k][p]+' and '+sub+' % </li>'
	                    // });
	                    if(asset != 0){
	                        data_v.push({name: pname, y: asset}); 
	                    }
	                }else if(k!="NO"){ 
	                    if(asset != 0){
	                        data_v.push({name: pname, y: asset}); 
	                    }
	                } else {
	                    if(asset != 0){
	                        data_v.push({name: "Platform", y: asset}); 
	                    }
	                }
	            });
	            var data_value = [];
	            $.each(data_v,function(key1, asset1){
	                if(asset1.name != 'Platform'){
	                    data_value.push({name: asset1.name, y: asset1.y}); 
	                } 
	            });

	            $.each(data_v,function(key2, asset2){
	                if(asset2.name == 'Platform'){
	                    data_value.push({name: asset2.name, y: asset2.y}); 
	                } 
	            });
	            $('#container-35').html('');
	            $('#container-35').highcharts({
	                colors: ['#3f8ce4', '#fe9d1e', '#f4284a', '#716aca', '#1f4e85', '#36c8fe', '#34bf5b', '#f46e01', '#b900fe','#64E572'],
	                chart: {
	                          type: 'pie',
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
	                                    text: '<span style="font-weight:bold; color:#1a2942; font-size:35px;">'+total_invested_loans+'</span>' + '<br>Total<br>' + 'Invested Loans',
	                                    align: 'center',
	                                    verticalAlign: 'middle',
	                                     x: -132,
	                                    y: -10,
	                                    style: {
	                                        color: '#a7aab1',
	                                        fontSize:'17px'
	                                    },
	                                });
	                                $(chart.series[0].data).each(function (j, seriesitem) {
	                                   $('<div class="legend-item"><div class="legend-item-label" style="color:'+seriesitem.color+'"><span>'+ seriesitem.name +'</span> <span style="font-weight:bold;">' + this.y + '</span></div></div>').click(function () {
	                                    seriesitem.visible ? seriesitem.hide() : seriesitem.show();
	                                }).appendTo('#items');
	                            });
	                            }
	                          }
	                        },
	                      x:20,
	                credits:{enabled: false},

	                title:{text: null},
	                plotOptions: {
	                          pie: {
	                            shadow: false,
	                            showInLegend: true,
	                            dataLabels: {
	                                enabled: false
	                            },
	                              legend: {
	                                 position: 'right'
	                              },
	                            width:'100%',
	                            innerSize: '90%',
	                          }
	                        },
	                tooltip: {
	                            formatter: function() {
	                                return '<b>' + this.point.name + '</b>:' + this.y+'%';
	                            }
	                        },

	                legend: {
	                    enabled: true,
	                    layout: 'vertical',
	                    align: 'right',
	                    verticalAlign: 'middle',
	                    useHTML: true,
	                            width: 250,
	                    itemMarginBottom: 5,     
	                    labelFormatter: function() {
	                        return '<div style="text-align: left; width:160px;float:left;color:'+this.color+'">' + this.name + '</div><div style="width:40px; margin-right:5px; float:left;text-align:right;color:#f00;color:'+this.color+'">' + this.y + '%</div>';
	                    }
	                },
	                series: [{
	                            innerSize: '85%',
	                            data: data_value
	                        }]
	            });
            }
        });
	}


})( jQuery );



var ShwPnl = false;
function ShwLoadingPanel(){
    if(!ShwPnl){
        var lDPnl = jQuery(document.createElement('div'))
        lDPnl.attr("id","loadingPnl");    
        lDPnl.attr("class","animsition-loading");    
        lDPnl.css("width",jQuery(window).width()+"px").css("height",jQuery(window).height()+"px").css("opacity",0);
        lDPnl.css("background","url("+baseURL+"images/ajax-loader.gif) no-repeat center rgba(255, 255, 255, 0.4)").css("position","fixed").css("left","0px").css("top","0px").css("z-index","10000"); 
        jQuery(lDPnl).appendTo("body");
        lDPnl.fadeTo(550, 1);
        ShwPnl = true;
    }else
        jQuery("#loadingPnl").fadeIn(550);
}
        
function remvLoadingPanel(){
    jQuery("#loadingPnl").fadeOut(100);
}