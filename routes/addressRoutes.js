var express = require('express');

var routes = function(Address) {

    var addressRouter = express.Router();

    //GET all addresses
    addressRouter.route('/')
        .post(function (req, res) {
            var address = new Address(req.body);
            address.save();
            res.status(201);
            res.send(address);
        })
        .get(function (req, res) {
            var query = {};

            //allow for filtering by query params
            if (req.query.firstName) {
                query.firstName = req.query.firstName;
            } else if (req.query.lastName) {
                query.lastName = req.query.lastName;
            } else if (req.query.city) {
                query.city = req.query.city;
            } else if (req.query.state) {
                query.state = req.query.state;
            } else if (req.query.zip) {
                query.zip = req.query.zip;
            } else if (req.query.address1) {
                query.address1 = req.query.address1;
            } else if (req.query.address2) {
                query.address2 = req.query.address2;
            }

            Address.find(query, function (err, addresses) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else {
                    res.json(addresses);
                }
            });
        });

    //use middleware to add the address to the request
    addressRouter.use('/:addressId', function(req, res, next) {
        Address.findById(req.params.addressId, function (err, address) {
            if (err) {
                res.status(500);
                res.send(err);
            } else if(address){
                req.address = address;
                next();
            }else{
                res.status(404);
                res.send('No address found.');
            }
        });
    });

    //GET an address by addressId
    addressRouter.route('/:addressId')
        .get(function (req, res) {
            res.json(req.address);
        })
        .put(function (req, res) {
            req.address.firstName = req.body.firstName;
            req.address.lastName = req.body.lastName;
            req.address.address1 = req.body.address1;
            req.address.address2 = req.body.address2;
            req.address.city = req.body.city;
            req.address.state = req.body.state;
            req.address.zip = req.body.zip;
            req.address.save(function(err) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else {
                    res.status(201);
                    Address.find(function (err, addresses) {
                        if (err) {
                            res.status(500);
                            res.send(err);
                        } else {
                            res.json(addresses);
                        }
                    });
                }
            });
        })
        .patch(function (req, res) {
            if(req.body._id){
                delete req.body._id;
            }

            for(var param in req.body){
                req.address[param] = req.body[param];
            }

            req.address.save(function(err) {
                if (err) {
                    res.status(500).send('Could not update the address.');
                } else {
                    res.json(req.address);
                }
            });
        })
        .delete(function (req, res) {
            req.address.remove(function(err) {
                if (err) {
                    res.status(500);
                    res.send(err);
                } else {
                    res.status(201);
                    Address.find(function (err, addresses) {
                        if (err) {
                            res.status(500);
                            res.send(err);
                        } else {
                            console.log('addresses',addresses);
                            res.json(addresses);
                        }
                    });
                }
            });
        });


    return addressRouter;
};

module.exports = routes;