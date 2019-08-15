import Camera from "../src/components/classes/systems/Camera"

import Vector from "../src/components/classes/math/vector"
import Sound from "../src/components/classes/systems/sound"

const mockLoadImage = jest.fn();
jest.mock("../src/components/functions/GetImage", () => mockLoadImage);

const mapX = 256;
const mapY = 176.1;
const height = 405;
const screenWidth = 512;
const screenHeight = 863;
const canvasX = 0;
const canvasY = (pause: boolean) => pause ? 480 : 120;
const sourceX = (x: number)=> x * mapX;
const sourceY = (y: number) => y * mapY;

describe('Should Create a Camera Class that displays a portion of the whole map',()=>{
      beforeEach(() => {
      });

      afterEach(jest.clearAllMocks);

      it.skip('#show() happy path -- should draw to the context', async ()=>{
            // 1. Arrange -- mock etc
            const camera = new Camera();

            const image = {foo: 'bar'};
            mockLoadImage.mockResolvedValue(image);            

            // parameters
            const pause = false;
            const mapUrl = 'http://foo.com';
            const currentMap = {
                  url: mapUrl,
                  position: new Vector(10, 50),
                  theme: new Sound('../music/Overworld.mp3')
            };
            const context = {
                  drawImage: jest.fn()
            };

            // 2. Act
            camera.show(pause, currentMap, context);

            // 3. Assert
            expect(mockLoadImage).toHaveBeenCalledWith(mapUrl);
            expect(mockLoadImage).toHaveBeenCalledTimes(1);
            expect(context.drawImage).toHaveBeenCalledWith(image,
                  sourceX(x),
                  sourceY(y),
                  mapX,
                  height,
                  canvasX,
                  canvasY(pause),
                  screenWidth,
                  screenHeight);
            expect(context.drawImage).toHaveBeenCalledTimes(1);
      });

      it.skip('#show() happy path -- paused, draws lower', async () => {
            // TODO
      });
})


