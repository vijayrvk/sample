var _  = require('lodash');
const fs = require('fs');
var async = require('async');
var uuidv4 = require('uuid/v4');
var HTML = require('html-parse-stringify');
var minify = require('html-minifier').minify;

var sampleHtml = '<span class="boldText">Name:</span>\n<input type="text" name="md_UserName_Txt"/>';
var sampleHtml1 = '<input type="checkbox" name="md_30day_Chk" id="md_30day_Chk" /><label class="boldText" for="md_30day_Chk">30-DAY CASE CONFERENCE</label>';
var sampleHtml2 = '<span class="boldText">Password:</span><input type="password" name="md_Password_Txt"/>';
var sampleHtml3  = '<input type="hidden" name="md_HiddenField_Txt"/>'
var sampleHtml4 = '<span class="boldText">Gender:</span><input type="radio" name="md_Gender_Rdo" value="male" id="md_Male_Rdo"> <label for="md_Male_Rdo">Male</lable><input type="radio" name="md_Gender_Rdo" value="female" id="md_Female_Rdo"> <label for="md_Female_Rdo">Female</lable><input type="radio" name="md_Gender_Rdo" value="other" id="md_Other_Rdo"><label for="md_Other_Rdo">Other</lable>'
var sampleHtml5 = '<span class="normalText">Goals:</span><br /><textarea name="md_Goals_Txt" style="width:100%" rows="4"></textarea><br />'
var sampleHtml6 = '<span class="boldText">Status</span> <select> <option value="1">Single</option> <option value="2">Married</option> <option value="3">Divorced</option> </select>'
console.log(minify(sampleHtml6))
var ast = HTML.parse(sampleHtml6);
var finalJson = [];
if(_.find(ast, function(o){ return o.attrs.type === 'radio'})) {
	var values = [];
	for (var i = 0; i < ast.length; i++) {
		if(ast[i].attrs.type === 'radio') {
			values.push({
				value: ast[i].attrs.value,
				name: ast[i + 1].children[0].content
			})	
		}
		
	}
	finalJson.push({
		input: "true",
		type: "radio",
		key: uuidv4(),
		value: "",
		label: ast[0].children[0].content,
		data: {
			values: values
		}
	});
} else if(_.find(ast, function(o){ return o.name === 'select'})) {
	var values = [];
	console.log(ast[1].children[0])
	for (var i = 0; i < ast[1].children.length; i++) {
		values.push({
			value: ast[1].children[i].attrs.value,
			name: ast[1].children[i].children[0].content
		})	
	}
	
	finalJson.push({
		input: "true",
		type: "select",
		key: uuidv4(),
		value: "",
		label: ast[0].children[0].content,
		data: {
			values: values
		}
	});
} else {
	async.forEach(ast, function(item, cb) {
		if(item.attrs.type === 'checkbox') {
			finalJson.push({
				input: "true",
				type: ast[0].attrs.type,
				key: uuidv4(),
				label: (ast[1].children[0].content) ? ast[1].children[0].content : ast[0].children[0].content
			});
		} else if(item.attrs.type === 'text') {
			finalJson.push({
				disabled: "true",
				type: "textfield",
				key: uuidv4(),
				label: (ast[0].children[0].content) ? ast[0].children[0].content : ast[1].children[0].content
			});
		} else if (item.attrs.type === 'password') {
			finalJson.push({
				input: "true",
				type: "password",
				key: uuidv4(),
				label: (ast[0].children[0].content) ? ast[0].children[0].content : ast[1].children[0].content
			});
		} else if(item.attrs.type === 'hidden') {
			finalJson.push({
				input: "true",
				type: "hidden",
				key: uuidv4(),
				label: item.attrs.name
			});
		} else if(item.name === 'textarea') {
			finalJson.push({
				input: "true",
				type: "textarea",
				key: uuidv4(),
				label: (ast[0].children[0].content) ? ast[0].children[0].content : ast[1].children[0].content
			});
		}
		cb();
	}, function(err) {
		if(!err) {
			console.log(finalJson)
		}
	});
}


console.log(finalJson)



