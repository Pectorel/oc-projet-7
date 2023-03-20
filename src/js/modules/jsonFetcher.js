class JsonFetcher {

    constructor(path) {

        return new Promise((resolve) => {

            fetch(path)
                .then((res) => {

                    res.json()
                        .then((data) => {
                            this.object = data;
                            resolve({"instance": this, "object": this.object});
                        });
                });

        });

    }

}

export {JsonFetcher};