<template>
  <div class="range-slider">
    <input class="range-slider__range" type="range" value="100" min="0" max="500" />
    <!-- <span class="range-slider__value">0</span> -->
  </div>
</template>
<script>
export default {
  name: "RangeSlider",
  mounted() {
    var slider = $(".range-slider"),
      range = $(".range-slider__range"),
      value = $(".range-slider__value");

    slider.each(function() {
      value.each(function() {
        var value = $(this)
          .prev()
          .attr("value");
        $(this).html(value);
      });

      range.on("input", function() {
        $(this)
          .next(value)
          .html(this.value);
      });
    });
  }
};
</script>
<style lang="scss" scoped>
// Base Colors
$shade-10: #2c3e50 !default;
$shade-1: #d7dcdf !default;
$shade-0: #fff !default;
$colour: #f0f !default;

.range-slider {
  margin: 60px 0 0 0%;
}

// Range Slider
$range-width: 100% !default;

$range-handle-color: $shade-10 !default;
$range-handle-color-hover: $colour !default;
$range-handle-size: 32px !default;

$range-track-color: $shade-1 !default;
$range-track-height: 10px !default;

$range-label-color: $shade-10 !default;
$range-label-width: 60px !default;

.range-slider {
  width: $range-width;
}

.range-slider__range {
  -webkit-appearance: none;
  width: calc(100% - (#{$range-label-width + 13px}));
  height: $range-track-height;
  border-radius: 5px;
  background: $range-track-color;
  background: linear-gradient(to right, green 0%, yellow 50%, red 100%);
  outline: none;
  padding: 0;
  margin: 0;

  // Range Handle
  &::-webkit-slider-thumb {
    appearance: none;
    width: $range-handle-size;
    height: $range-handle-size;
    border-radius: 50%;
    background: $range-handle-color;
    cursor: pointer;
    transition: background 0.15s ease-in-out;

    &:hover {
      background: $range-handle-color-hover;
    }
  }

  &:active::-webkit-slider-thumb {
    background: $range-handle-color-hover;
  }

  &::-moz-range-thumb {
    width: $range-handle-size;
    height: $range-handle-size;
    border: 0;
    border-radius: 50%;
    background: $range-handle-color;
    cursor: pointer;
    transition: background 0.15s ease-in-out;

    &:hover {
      background: $range-handle-color-hover;
    }
  }

  &:active::-moz-range-thumb {
    background: $range-handle-color-hover;
  }
}

// Range Label
.range-slider__value {
  display: inline-block;
  position: relative;
  width: $range-label-width;
  color: $shade-0;
  line-height: 20px;
  text-align: center;
  border-radius: 3px;
  background: $range-label-color;
  padding: 5px 10px;
  margin-left: 8px;

  &:after {
    position: absolute;
    top: 8px;
    left: -7px;
    width: 0;
    height: 0;
    border-top: 7px solid transparent;
    border-right: 7px solid $range-label-color;
    border-bottom: 7px solid transparent;
    content: "";
  }
}

// Firefox Overrides
::-moz-range-track {
  background: $range-track-color;
  background: linear-gradient(to right, green 0%, yellow 50%, red 100%);
  border: 0;
}

input::-moz-focus-inner,
input::-moz-focus-outer {
  border: 0;
}
</style>