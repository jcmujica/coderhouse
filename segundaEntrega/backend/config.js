export default {
    PORT: process.env.PORT || 8080,
    mongoDb: {
        cnxStr: 'mongodb+srv://admin:admin@coderhouse.bbjyk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
        params: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    },
    firebase: {
        type: "service_account",
        project_id: "coderhouse-4f606",
        private_key_id: "e2a63ae97375f9e75cef623e581d4ca395ab3a2c",
        private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDkflXMzd8ne4gh\nIbZ740d2256ped9iiBxEL/Gt2RYVm6HmpAZRNpd9lC8RhHmBo3QBmZx7n6ipXfcv\nhFY2fcxHz6qCHqQ3OjuiJuEMhOHHIPj5xfHVM2Ba7LP6l+MEQO53hLYVafXfUofN\n1/tiZVoC5tNJQOtvJ3tHzoX7fBfTVFOIAyZCy3RNJWlsyIEVomkGuxPCSMfT8vvw\nzKlAU4ASotZF8MY1kNXMxMxtcfwghpPmhIudbY2KPZicX+D4e6VbRF0nGfZHPlkg\nH4MycBi7tOYqizsiZF4JincaTEwFUU5ALqJd3u4uED2xZA7YmwrHiIben0E9Puro\nCjRA3QPpAgMBAAECggEADes9PknfOWg+yWfkliTo9k5YGrJUH4wzjprOEd1KyVuu\n794XjWxyK4HyoRJNFY7Xsv5AyE4YR+LzuxcIam7c2hYGKMGFluCq/8x3Apx4pXj2\neb6rZeWojblkGFSWzWxIKoswzVqkUeuU3r70rxCF/G3Duq9j+CQzUBM+Way8RdD8\nd7ZcmkfGxXyN4DeLpkZYKBTpF9M+qPhQlStK3lLAUq96Dfil7xG3t9czVUA7vc9w\nlJlvwWEt6DitI2NDBI0THD1Euj1EmDjcEkX2pFn3+ChY7/hxCIyKiMEFO69H1M15\noAt7daNSQ3W7PWwGZhcWjmi8NkDGajq2wwt2tKpzYQKBgQD/pB2VbzC81gOLAiLq\nDJDF2dZe9t8dk4RTSCK1QeyjL5NXilII/5vbVrd3UR5Hmsrlj3xX2v+hA0ypzr14\nwQkmaNY+Y76DPD3WJP6OrxcMuEq5fj4J//9OcpQU8+BhjPUyRdfOgEOdF9Xcyq3+\nSFkhC5LklYhe9dSrcuY5fPzzEQKBgQDk0HZGIPZESAc3ze6m7wjrwLIJcILRmBuV\nHjYso93iU1bA9eVgxxvFaR7HdpwR4m3bcuixxoFmOaqEcvgZY0lJJITatfSe664k\nKi17FvRqWRiy1SgMNyZ0Sz6GJIdslsRhQ0olkXklFF5nTcYfj6pIKEdaPh/+q3DK\nA3MoLD5TWQKBgQDjOnBlXIEYyK47iDmainLAumFW5d7qPi5XjH31WVTKtEYmgLds\nci+KJilLsFnW0dtZc1HWEb4402L4aOB3jjXg4zzUFfrIUeqxBw8RqsY1MzaQbIse\nfmLjyuqfOSsP6qgj+HrbfZ0b7IzXBXzk0lAPFGeMMPIXXjGb97R2EwgP0QKBgDPD\nXR5cUpn72XYsZjLpnJEI1L4B7/ZOfN7tKMBMieOritK4Th3orUWplEb3dDMvkD62\n7iFZkOh5XzP7dlj39xpO4qc/xok1M/4GdKeF9+EfKtE6G4c36sEgTJK4LNLKAL8o\nI9v/3vIee4TPOWTmcVVFl2644zAPxMJOqXyLFcZxAoGBAKaQBetGDtmhiYcZZ1s7\nEV5pvW3S/1kquvZ5+oXZtXfwh7N242ODEpu31EWi8loOdDKxmDhCkEEkEvaBkgDC\nqB9pLwk4dLXb8xA0m9aNSaQXqWy6b1N6TUByC9chL/lgLFhPm4WtvIuvK6iAdExL\nuZl5GN12GOabRaCUxrPorh2F\n-----END PRIVATE KEY-----\n",
        client_email: "firebase-adminsdk-khmu8@coderhouse-4f606.iam.gserviceaccount.com",
        client_id: "113457083666223413808",
        auth_uri: "https://accounts.google.com/o/oauth2/auth",
        token_uri: "https://oauth2.googleapis.com/token",
        auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
        client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-khmu8%40coderhouse-4f606.iam.gserviceaccount.com"
    }
}