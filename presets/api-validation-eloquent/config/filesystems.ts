export default {
  /*
	 |--------------------------------------------------------------------------
	 | Default Filesystem Disk
	 |--------------------------------------------------------------------------
	 */
  default: env("FILESYSTEM_DRIVER", "local"),

  /*
	 |--------------------------------------------------------------------------
	 | Filesystem Disks
	 |--------------------------------------------------------------------------
	 |
	 | Supported: "local", "s3"
	 | make sure @slynova/flydrive-s3 is installed to use s3 driver
	 */
  disks: {
    local: {
      driver: "local",
      config: {
        root: process.cwd(),
      },
    },

    s3: {
      driver: "s3",
      config: {
        key: env("AWS_S3_KEY"),
        secret: env("AWS_S3_SECRET"),
        region: env("AWS_S3_REGION"),
        bucket: env("AWS_S3_BUCKET"),
      },
    },

    minio: {
      driver: "s3",
      config: {
        key: env("AWS_S3_KEY"),
        secret: env("AWS_S3_SECRET"),
        region: env("AWS_S3_REGION"),
        bucket: env("AWS_S3_BUCKET"),
        endpoint: env("AWS_S3_ENDPOINT"),
        s3ForcePathStyle: true,
      },
    },
  },
};
