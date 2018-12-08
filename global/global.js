var surg_dt, assumed_dt, min_assumed, max_assumed, relinq_dt, min_relinq, max_relinq, global_end_dt, one_day, twelve_hours;
one_day = 1000*24*60*60;
twelve_hours = 1000*12*60*60;

function days_between(from_dt, to_dt) {
  var diffDays = Math.round(Math.abs((from_dt.getTime() - to_dt.getTime()) / one_day));
  return(diffDays + 1);
}

function format_date(date, sep) {
  var month, day, year;
  month = '' + (date.getMonth() + 1);
  day = '' + date.getDate();
  year = date.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  if(sep == "-") return [year,month,day].join('-');
  if(sep == "/") return [month,day,year].join('/');
}

function str_to_date(str) {
  var parts, retDate;
  parts = str.split("-");
  retDate = new Date(parts[0], parts[1] - 1, parts[2]);
  return(retDate);
}

function update_note_txt() {
  var note_txt, num_days = days_between(relinq_dt, assumed_dt);
  note_txt = "Assumed care " + format_date(assumed_dt, "/") + "; ";
  note_txt = note_txt + "Relinquished care " + format_date(relinq_dt, "/") + "; ";
  note_txt = note_txt + num_days;
  if (num_days == 1) {
    note_txt = note_txt + " Day";
  } else {
    note_txt = note_txt + " Days";
  }
  $('#note_txt').val(note_txt);
}

function update_surg_dt() {
  surg_dt = str_to_date($('#surg_dt').val());
  assumed_dt.setTime(surg_dt.getTime() + one_day + twelve_hours);
  assumed_dt.setHours(0);
  relinq_dt.setTime(surg_dt.getTime() + (one_day * 90) + twelve_hours);
  relinq_dt.setHours(0);
  global_end_dt.setTime(relinq_dt.getTime());
  min_assumed = new Date(assumed_dt.getTime());
  max_assumed = new Date(relinq_dt.getTime());
  min_relinq = new Date(assumed_dt.getTime());
  max_relinq = new Date(global_end_dt.getTime());
  $('#assumed_dt').val(format_date(assumed_dt, '-'));
  $('#assumed_dt').attr({"min": format_date(min_assumed, '-'), "max": format_date(max_assumed, "-")});
  $('#relinq_dt').val(format_date(relinq_dt, '-'));
  $('#relinq_dt').attr({"min": format_date(min_relinq, '-'), "max": format_date(max_relinq, "-")});
  $('#global_end_dt').val(format_date(global_end_dt, '-'));
  update_note_txt();
}

function update_assumed_dt() {
  assumed_dt = str_to_date($('#assumed_dt').val());
  min_relinq = new Date(assumed_dt.getTime());
  max_relinq = new Date(global_end_dt.getTime());
  $('#relinq_dt').attr({"min": format_date(min_relinq, '-'), "max": format_date(max_relinq, "-")});
  update_note_txt();
}

function update_relinq_dt() {
  relinq_dt = str_to_date($('#relinq_dt').val());
  update_note_txt();
}

function load_form() {
  today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);
  today.setMilliseconds(0);
  surg_dt = new Date(today.getTime() - one_day);
  assumed_dt = new Date(surg_dt.getTime() + one_day);
  relinq_dt = new Date(surg_dt.getTime() + (90 * one_day));
  global_end_dt = new Date(surg_dt.getTime() + (90 * one_day));
  min_assumed = new Date(assumed_dt.getTime());
  max_assumed = new Date(relinq_dt.getTime());
  min_relinq = new Date(assumed_dt.getTime());
  max_relinq = new Date(global_end_dt.getTime());
  global_end_dt = relinq_dt;
  $('#surg_dt').val(format_date(surg_dt, '-'));
  $('#assumed_dt').val(format_date(assumed_dt, '-'));
  $('#assumed_dt').attr({"min": format_date(min_assumed, '-'), "max": format_date(max_assumed, "-")});
  $('#relinq_dt').val(format_date(relinq_dt, '-'));
  $('#relinq_dt').attr({"min": format_date(min_relinq, '-'), "max": format_date(max_relinq, "-")});
  $('#global_end_dt').val(format_date(global_end_dt, '-'));
  update_note_txt();
}

function copy_surg_dt() {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(format_date(surg_dt, '/')).select();
  document.execCommand("copy");
  $temp.remove();
}

function copy_assumed_dt() {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(format_date(assumed_dt, '/')).select();
  document.execCommand("copy");
  $temp.remove();
}

function copy_relinquished_dt() {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(format_date(relinq_dt, '/')).select();
  document.execCommand("copy");
  $temp.remove();
}

function copy_end_global_dt() {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val(format_date(global_end_dt, '/')).select();
  document.execCommand("copy");
  $temp.remove();
}

function copy_note_txt() {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($('#note_txt').val()).select();
  document.execCommand("copy");
  $temp.remove();
}

$(document).ready(load_form());
