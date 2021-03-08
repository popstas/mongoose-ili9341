#!/bin/bash

# png2dif compile:
# git clone https://github.com/mongoose-os-libs/ili9341-spi
# cd ili9341-spi/contrib/png2dif
# make

png2dif -i assets/graph-rgb8.png -o fs/img.dif
