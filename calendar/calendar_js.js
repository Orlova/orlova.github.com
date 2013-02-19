/*Напишите функцию, которая умеет генерировать календарь для заданной пары (месяц, год).
		Календарь должен быть таблицей, где каждый день — это TD. У таблицы должен быть заголовок с названиями дней недели, каждый день — TH.
		Синтаксис: createCalendar(id, year, month).*/

	;(function () {
		'use strict';

		var table_content = '<thead>\
					<caption><span class="arrow previous"></span><span>Месяц</span><span class="arrow next"></span></caption>\
					<tr>\
						<th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th>\
					</tr>\
				</thead>';

		var month_names = ['январь', 'февраль', 'март', 'апрель', 'май', 'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
		var month_names_for_title = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
		var week_days = ['понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
		var button_previous, button_next;

		function set_caption () {
			var self = this;
			var caption = self.calendar_table.getElementsByTagName('caption')[0];
			caption = caption.children[1];

			caption.innerHTML = month_names[self.month-1] + ' ' + self.year;
		};

		function change_month (type) {
			var self = this;
			if (type === 'next') {
				if (self.month === 12) {
				self.month = 1;
				self.year += 1;
				} else {
					self.month += 1;
				}
			} else if (type === 'previous') {
				if (self.month === 1) {
				self.month = 12;
				self.year -= 1;
				} else {
					self.month -= 1;
				}
			}
			self.change_calendar();
		};

		function set_handler_arrows () {
			var self = this;
			var button_previous = self.calendar_table.querySelector('.previous');
			var button_next = self.calendar_table.querySelector('.next');

			button_previous.onclick = function () {
				change_month.call(self, 'previous');
			};
			button_next.onclick = function () {
				change_month.call(self, 'next');
			};
		};

		function create_first_week () {
			var tr, td, current_day, i, j;
			var self = this;

			tr = document.createElement('tr');
			current_day = (self.new_date.getDay() === 0) ? 7 : self.new_date.getDay();

			//add days of the previous month
			if ( (self.new_date.getDate() === 1) && (current_day !== 1) ) {     
				var last_date = new Date(self.year, self.month-1, -(current_day-2));
				var last_current_day; 

				for (j = 1; j < current_day; j += 1) {
					td = document.createElement('td');
					last_current_day = (last_date.getDay() === 0) ? 7 : last_date.getDay();

					if (last_current_day === j) {
						td.innerHTML = last_date.getDate();
						td.className = 'not_active';
						last_date.setDate(last_date.getDate() + 1);
					}
					tr.appendChild(td);
				}
			}

			for (i = j; i < 8; i += 1) {
				td = document.createElement('td');
				current_day = (self.new_date.getDay() === 0) ? 7 : self.new_date.getDay();
				
				if (current_day === i) {
						td.innerHTML = self.new_date.getDate();
						if (self.new_date.getMonth() !== self.month-1) {
							td.className = 'not_active';
						} else {
							td.className = 'active';
							td.title = self.new_date.getDate() + ' ' + month_names_for_title[self.month-1] + ' ' + week_days[i-1];
						}
						self.new_date.setDate(self.new_date.getDate() + 1);
				}
				tr.appendChild(td);
			}
			return tr;
		};

		function create_week () {
			var tr, td, current_day;
			var self = this;

			tr = document.createElement('tr');
			for (var i = 1; i < 8; i += 1) {
				td = document.createElement('td');
				current_day = (self.new_date.getDay() === 0) ? 7 : self.new_date.getDay();
				if (current_day === i) {
						td.innerHTML = self.new_date.getDate();
						if (self.new_date.getMonth() !== self.month-1) {
							td.className = 'not_active';
						} else {
							td.className = 'active';
							td.title = self.new_date.getDate() + ' ' + month_names_for_title[self.month-1] + ' ' + week_days[i-1];
						}
						self.new_date.setDate(self.new_date.getDate() + 1);
				}
				tr.appendChild(td);
			}
			return tr;
		};

		function Calendar (id, year, month) {
			if ( !(this instanceof Calendar) ) {
				new Calendar(arguments);
			}

			this.node = document.getElementById(id);
			this.year = year;
			this.month = month;
			
			this.calendar_table = document.createElement('table');
			this.init();
			this.node.appendChild(this.calendar_table);
		};

		Calendar.prototype.init = function () {
			this.calendar_table.innerHTML = table_content;
			this.new_date = new Date(this.year, this.month-1, 1);
			set_caption.call(this);

			var week;
			week = create_first_week.call(this);
			this.calendar_table.appendChild(week);
			while (this.new_date.getMonth() === this.month-1) {
				week = create_week.call(this);
				this.calendar_table.appendChild(week);
			}

			set_handler_arrows.call(this);
		};

		Calendar.prototype.change_calendar = function () {
			this.calendar_table.innerHTML = ''; //вот тут не уверенна, правильно ли очистила таблицу
			this.init();
		};

		window.Calendar = Calendar;
	}());

	window.onload = function () {
		window.calendar = new Calendar('calendar', 2012, 12);
		// window.calendar2 = new Calendar('calendar2', 2012, 11);
		// window.calendar3 = new Calendar('calendar3', 2013, 1);
		new Calendar('calendar2', 2010, 1);
	}