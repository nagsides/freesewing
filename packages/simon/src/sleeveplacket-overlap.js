export default part => {
  // prettier-ignore
  let {store, measurements, utils, sa, Point, points, Path, paths, Snippet, snippets, complete, paperless, macro, options} = part.shorthand();

  let width = options.sleevePlacketWidth;
  let length = measurements.shoulderToWrist * options.sleevePlacketLength;

  points.midLeft = new Point(0, 0);
  points.midLen = points.midLeft.shift(0, length);
  points.midRight = points.midLeft.shift(0, length + width * 1.25);
  points.fold1Left = points.midLeft.shift(90, width / 2);
  points.fold2Left = points.midLeft.shift(-90, width / 2);
  points.boxTopRight = points.midRight.shift(90, width / 2);
  points.boxBottomRight = points.midRight.shift(-90, width / 2);
  points.boxTopLeft = points.midLen.shift(90, width / 2);
  points.boxBottomLeft = points.midLen.shift(-90, width / 2);
  points.boxTip = points.midLen.shift(0, width * 1.5);
  points.fold1Right = points.boxTopRight.shift(0, width * 0.5);
  points.fold2Right = points.boxBottomRight.shift(0, width * 0.5);
  points.topLeft = points.fold1Left.shift(90, width / 2 - 1.5);
  points.topRight = points.fold1Right.shift(90, width / 2 - 1.5);
  points.bottomRight = points.fold2Right.shift(-90, width * 1.5 - 1.5);
  points.bottomLeft = points.fold2Left.shift(-90, width * 1.5 - 1.5);
  points.cutRight = points.fold2Right.shift(-90, width / 2 - 1.5);
  points.zig = points.cutRight.shift(180, width * 0.6);
  points.zag = new Point(
    points.bottomRight.x - width,
    points.bottomRight.y - width * 0.6
  );
  points.cutLeft = points.zag.shift(180, width / 2);
  points.cutBottom = new Point(points.cutLeft.x, points.bottomLeft.y);
  points.fold3Left = new Point(0, width * 1.5);
  points.fold3Right = new Point(points.cutBottom.x, width * 1.5);

  paths.seam = new Path()
    .move(points.topLeft)
    .line(points.topRight)
    .line(points.cutRight)
    .line(points.zig)
    .line(points.zag)
    .line(points.cutLeft)
    .line(points.cutBottom)
    .line(points.bottomLeft)
    .close()
    .attr("class", "fabric");

  paths.outline = new Path()
    .move(points.fold1Left)
    .line(points.boxTopRight)
    .line(points.boxTip)
    .line(points.boxBottomRight)
    .line(points.fold2Left)
    .move(points.boxTopLeft)
    .line(points.boxBottomLeft)
    .attr("class", "dashed");

  paths.folds = new Path()
    .move(points.fold3Left)
    .line(points.fold3Right)
    .move(points.boxBottomRight)
    .line(points.fold2Right)
    .line(points.boxTip)
    .line(points.fold1Right)
    .line(points.boxTopRight)
    .attr("class", "dotted");

  // Complete pattern?
  if (complete) {
    // Title
    points.title = new Point(length / 4, 0);
    macro("title", {
      at: points.title,
      nr: 10,
      title: "sleevePlacketOverlap",
      scale: 0.6
    });

    // Button
    points.buttonhole = new Point(length / 2, 0);
    snippets.buttonhole = new Snippet("buttonhole", points.buttonhole).attr(
      "data-rotate",
      90
    );

    if (sa) {
      paths.sa = new Path()
        .move(points.bottomLeft)
        .line(points.bottomLeft.shift(180, sa))
        .line(points.topLeft.shift(180, sa))
        .line(points.topLeft)
        .attr("class", "fabric sa");
    }
  }

  // Paperless?
  if (paperless) {
  }

  return part;
};