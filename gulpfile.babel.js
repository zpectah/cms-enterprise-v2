import { src, dest, series, parallel, watch } from 'gulp';
import del from 'del';
import webpack from 'webpack';
import webpack_stream from 'webpack-stream';
import gulpReplace from 'gulp-replace';
import gulpRename from 'gulp-rename';
import gulpJsonMinify from 'gulp-jsonminify';
import gulpIf from 'gulp-if';
import gulpCleanCss from 'gulp-clean-css';
import gulpCssImport from 'gulp-cssimport';
import gulpSourceMaps from 'gulp-sourcemaps';
import { VueLoaderPlugin } from 'vue-loader';

import { date } from './utils/helpers';

const sass = require('gulp-sass')(require('sass'));
const _path = require('path');

const ENV_DEV = 'development';
const ENV_TEST = 'test';
const ENV_PROD = 'production';
const PATH_SRC = './src/';
const PATH_DEV = './dev/';
const PATH_TEST = './test/';
const PATH_PROD = './prod/';

const source = {
	Environment: './.envfile',
	Assets: [`${PATH_SRC}assets/**/*`],
	Core: [
		`${PATH_SRC}**/*.php`,
		`${PATH_SRC}**/.htaccess`,
		`${PATH_SRC}**/*.xml`,
		`${PATH_SRC}**/*.txt`,
		`!${PATH_SRC}web/app/*`,
	],
	WebApp: [
		`${PATH_SRC}web/app/**/*.php`,
		`${PATH_SRC}web/app/**/.htaccess`,
		`${PATH_SRC}web/app/**/*.xml`,
		`${PATH_SRC}web/app/**/*.txt`,
	],
	Json: [`${PATH_SRC}**/*.json`, `!${PATH_SRC}**/scripts/**/*.json`],
	ReactApp_index: `${PATH_SRC}admin/scripts/index.js`,
	ReactApp_watch: [
		`${PATH_SRC}**/*.js`,
		`${PATH_SRC}**/*.jsx`,
		`${PATH_SRC}**/*.ts`,
		`${PATH_SRC}**/*.tsx`,
		`${PATH_SRC}**/*.json`,
		`${PATH_SRC}**/*.css`,
	],
	VueApp_index: `${PATH_SRC}web/scripts/index.js`,
	VueApp_watch: [
		`${PATH_SRC}web/scripts/**/*.js`,
		`${PATH_SRC}web/scripts/**/*.jsx`,
		`${PATH_SRC}web/scripts/**/*.vue`,
		`${PATH_SRC}web/scripts/**/*.css`,
	],
	Styles: `${PATH_SRC}web/styles/index.scss`,
	Styles_watch: [
		`${PATH_SRC}web/styles/**/*.css`,
		`${PATH_SRC}web/styles/**/*.scss`
	],
};
const getEnv = (env) => {
	if (env === ENV_TEST) return ENV_PROD;

	return env;
};

const TaskDef = {
	Clean: function (path, env, cb) {
		process.env.NODE_ENV = env;
		return del.sync(
			[`${path}**/*`, `!${path}logs/**`, `!${path}uploads/**`],
			cb(),
		);
	},
	Environment: function (path, env, cb) {
		const debug = env === 'development';
		src(source.Environment)
			.pipe(gulpReplace('%%%%%ENV_ENV%%%%%', env))
			.pipe(gulpReplace('%%%%%ENV_TIMESTAMP%%%%%', date.getTimestampString()))
			.pipe(gulpReplace('%%%%%ENV_DEBUG%%%%%', String(debug)))
			.pipe(gulpRename('env.php'))
			.pipe(dest(`${path}config/`));
		cb();
	},
	Assets: function (path, env, cb) {
		src(source.Assets).pipe(dest(`${path}assets/`));
		cb();
	},
	Core: function (path, env, cb) {
		src(source.Core).pipe(dest(path));
		cb();
	},
	WebApp: function (path, env, cb) {
		src(source.WebApp).pipe(dest(`${path}web/app/`));
		cb();
	},
	Json: function (path, env, cb) {
		src(source.Json)
			.pipe(gulpIf(env !== ENV_DEV, gulpJsonMinify({})))
			.pipe(dest(path));
		cb();
	},
	ReactApp: function (path, env, cb) {
		webpack_stream({
			mode: getEnv(env),
			optimization: {
				minimize: env !== ENV_DEV,
			},
			entry: {
				index: source.ReactApp_index,
			},
			output: {
				path: '',
				filename: env === ENV_DEV ? '[name].bundle.js' : '[name].bundle.min.js',
			},
			resolve: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
			module: {
				rules: [
					{
						test: /\.css$/i,
						use: ['style-loader', 'css-loader'],
					},
					{
						test: /\.(png|jp(e*)g|svg|gif)$/,
						use: [
							{
								loader: 'file-loader',
								// options: {
								// 	name: 'images/[hash]-[name].[ext]',
								// },
							},
						],
					},
					{
						test: /\.(js|jsx|ts|tsx)$/,
						include: _path.resolve(__dirname, 'src'),
						exclude: /node_modules/,
						use: [
							{
								loader: 'babel-loader',
								options: {
									presets: [
										'@babel/preset-env',
										'@babel/preset-react',
										'@babel/preset-typescript',
									],
								},
							},
						],
					},
				],
			},
			performance: {
				hints: false,
			},
		}).pipe(dest(`${path}admin/scripts/`));
		cb();
	},
	VueApp: function (path, env, cb) {
		webpack_stream({
			mode: getEnv(env),
			optimization: {
				minimize: env !== ENV_DEV,
			},
			entry: {
				index: source.VueApp_index,
			},
			output: {
				path: '',
				filename: env === ENV_DEV ? '[name].bundle.js' : '[name].bundle.min.js',
			},
			resolve: {
				extensions: ['.js', '.jsx', '.vue'],
				alias: {
					vue: "vue/dist/vue.esm-bundler.js"
				},
			},
			plugins: [
				new webpack.DefinePlugin({
					// __VUE_OPTIONS_API__: getEnv(env) === ENV_DEV,
					__VUE_PROD_DEVTOOLS__: getEnv(env) === ENV_DEV,
					'process.env': {
						NODE_ENV: JSON.stringify(getEnv(env)),
					}
				}),
				new VueLoaderPlugin(),
			],
			module: {
				rules: [
					{
						test: /\.(js|jsx|ts|tsx)$/,
						include: _path.resolve(__dirname, 'src'),
						exclude: /node_modules/,
						use: [
							{
								loader: 'babel-loader',
								options: {
									presets: [
										'@babel/preset-env',
									],
								},
							},
						],
					},
					{
						test: /\.vue$/,
						loader: "vue-loader",
					},
				],
			},
			performance: {
				hints: false,
			},
		}).pipe(dest(`${path}web/scripts/`));
		cb();
	},
	Styles: function (path, env, cb) {
		src(source.Styles)
			.pipe(gulpSourceMaps.init({}))
			.pipe(sass({}).on('error', sass.logError))
			.pipe(gulpCssImport({}))
			.pipe(
				gulpIf(env !== ENV_DEV, dest(`${path}web/styles/`)),
			)
			.pipe(
				gulpIf(
					env !== ENV_DEV,
					gulpCleanCss({
						compatibility: 'ie9',
					}),
				),
			)
			.pipe(
				gulpIf(env !== ENV_DEV, gulpRename({
					suffix: '.min',
				})),
			)
			.pipe(gulpIf(env !== ENV_DEV, gulpSourceMaps.write()))
			.pipe(dest(`${path}web/styles/`));
		cb();
	},
};
const Task = {
	Clean: {
		dev: (cb) => TaskDef.Clean(PATH_DEV, ENV_DEV, cb),
		test: (cb) => TaskDef.Clean(PATH_TEST, ENV_TEST, cb),
		prod: (cb) => TaskDef.Clean(PATH_PROD, ENV_PROD, cb),
	},
	Environment: {
		dev: (cb) => TaskDef.Environment(PATH_DEV, ENV_DEV, cb),
		test: (cb) => TaskDef.Environment(PATH_TEST, ENV_TEST, cb),
		prod: (cb) => TaskDef.Environment(PATH_PROD, ENV_PROD, cb),
	},
	Assets: {
		dev: (cb) => TaskDef.Assets(PATH_DEV, ENV_DEV, cb),
		test: (cb) => TaskDef.Assets(PATH_TEST, ENV_TEST, cb),
		prod: (cb) => TaskDef.Assets(PATH_PROD, ENV_PROD, cb),
	},
	Json: {
		dev: (cb) => TaskDef.Json(PATH_DEV, ENV_DEV, cb),
		test: (cb) => TaskDef.Json(PATH_TEST, ENV_TEST, cb),
		prod: (cb) => TaskDef.Json(PATH_PROD, ENV_PROD, cb),
	},
	WebApp: {
		dev: (cb) => TaskDef.WebApp(PATH_DEV, ENV_DEV, cb),
		test: (cb) => TaskDef.WebApp(PATH_TEST, ENV_TEST, cb),
		prod: (cb) => TaskDef.WebApp(PATH_PROD, ENV_PROD, cb),
	},
	Core: {
		dev: (cb) => TaskDef.Core(PATH_DEV, ENV_DEV, cb),
		test: (cb) => TaskDef.Core(PATH_TEST, ENV_TEST, cb),
		prod: (cb) => TaskDef.Core(PATH_PROD, ENV_PROD, cb),
	},
	ReactApp: {
		dev: (cb) => TaskDef.ReactApp(PATH_DEV, ENV_DEV, cb),
		test: (cb) => TaskDef.ReactApp(PATH_TEST, ENV_TEST, cb),
		prod: (cb) => TaskDef.ReactApp(PATH_PROD, ENV_PROD, cb),
	},
	VueApp: {
		dev: (cb) => TaskDef.VueApp(PATH_DEV, ENV_DEV, cb),
		test: (cb) => TaskDef.VueApp(PATH_TEST, ENV_TEST, cb),
		prod: (cb) => TaskDef.VueApp(PATH_PROD, ENV_PROD, cb),
	},
	Styles: {
		dev: (cb) => TaskDef.Styles(PATH_DEV, ENV_DEV, cb),
		test: (cb) => TaskDef.Styles(PATH_TEST, ENV_TEST, cb),
		prod: (cb) => TaskDef.Styles(PATH_PROD, ENV_PROD, cb),
	},
};

export const dev_watch = (cb) => {
	watch(source.Assets, {}, Task.Assets.dev);
	watch([...source.Core, `${PATH_SRC}config/**/*.json`], {}, Task.Core.dev);
	watch(source.WebApp, {}, Task.WebApp.dev);
	watch(source.Json, {}, Task.Json.dev);
	watch(source.ReactApp_watch, {}, Task.ReactApp.dev);
	watch(source.VueApp_watch, {}, Task.VueApp.dev);
	watch(source.Styles_watch, {}, Task.Styles.dev);
	cb();
};
export const dev = series(
	Task.Clean.dev,
	parallel(
		Task.Assets.dev,
		Task.Json.dev,
		Task.Core.dev,
		Task.WebApp.dev,
		Task.ReactApp.dev,
		Task.VueApp.dev,
		Task.Styles.dev,
	),
	Task.Environment.dev,
);
export const test = series(
	Task.Clean.test,
	series(
		Task.Assets.test,
		Task.Json.test,
		Task.Core.test,
		Task.WebApp.test,
		Task.ReactApp.test,
		Task.VueApp.test,
		Task.Styles.test,
	),
	Task.Environment.test,
);
export const prod = series(
	Task.Clean.prod,
	series(
		Task.Assets.prod,
		Task.Json.prod,
		Task.Core.prod,
		Task.WebApp.prod,
		Task.ReactApp.prod,
		Task.VueApp.prod,
		Task.Styles.prod,
	),
	Task.Environment.prod,
);

export const start = series(dev, dev_watch);

export default dev;
