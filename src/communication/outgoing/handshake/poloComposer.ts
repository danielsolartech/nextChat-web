import PacketComposer from '..';

class PoloComposer extends PacketComposer {
  constructor(
    private beat: number,
  ) {
    super('polo');
  }

  async execute(): Promise<void> {
    this.writeInteger(this.beat);
  }
}

export default PoloComposer;
