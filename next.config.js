/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import withBundleAnalyzer from '@next/bundle-analyzer';
import withMDX from '@next/mdx';
import withTM from 'next-transpile-modules';
/**
 * ! NOTE !
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  typescript: {
    // ! WARNING !
    // Dangerously allow production builds to successfully
    // complete even if your project has type errors.
    // Only set to true if you have issues with your types
    // preventing production builds from succeeding.
    ignoreBuildErrors: false,
  },
  swcMinify: true,
  webpack(config, options) {
    const { isServer } = options;
    // don't resolve 'fs' module on the client to prevent this error on build --> Error: Can't resolve 'fs'
    if (!isServer) {
      config.resolve.fallback = {
          fs: false
      }
    }
    // config.resolve.modules.push(path.resolve('./src')),
    // config.module.rules.push({
    //   test: /\.(ogg|mp3|wav|mpe?g)$/i,
    //   exclude: config.exclude,
    //   use: [
    //     {
    //       loader: require.resolve('url-loader'),
    //       options: {
    //         limit: config.inlineImageLimit,
    //         fallback: require.resolve('file-loader'),
    //         publicPath: `${config.assetPrefix}/_next/static/images/`,
    //         outputPath: `${isServer ? '../' : ''}static/images/`,
    //         name: '[name]-[hash].[ext]',
    //         esModule: config.esModule || false,
    //       },
    //     },
    //   ],
    // },
    // {
    //   test: /\.txt$/i,
    //   use: [
    //     {
    //       loader: 'raw-loader',
    //       options: {
    //         esModule: false,
    //       },
    //     },
    //   ],
    // },
    // {
    //   test: /\.svg$/,
    //   use: ["@svgr/webpack"]
    // }
    // );
    // config.resolve.fallback = {
    //   ...config.resolve.fallback,
    //   net: false,
    //   tls: false,
    //   readline: false,
    //   module: false,
    //   child_process: false,
    // };
    return config;
  }
};

const compose = (/** @type {any[]} */ ...fns) => (/** @type {any} */ config) => fns.reduceRight((currentConfig, fn) => fn(currentConfig), config);

const params = {
  ANALYZE: { enabled: process.env.ANALYZE === 'true' },
  MDX: { extension: /\.mdx?$/ },
  TM: ['lucide-react', 'react-feather'],
};

export default compose(withBundleAnalyzer(params.ANALYZE), withTM(params.TM), withMDX(params.MDX))(config);